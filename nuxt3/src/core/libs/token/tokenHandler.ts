import crossTab from 'core/libs/crossTab'
import crossTabEvents from 'core/constants/crossTabEvents'
import helper from 'core/libs/helper/helper'
import type {ApiRequestInterface} from 'core/libs/api/apiRequest'
import type {BaseStorageInterface} from 'core/core'
import type {TokenStorageKey, TokenPayloadInterface, TokenDataInterface, TokenType} from './token.type'
import {appLodash} from 'core/libs/lodashLoader'
import EagleStorage from 'core/libs/storage/localStorage'

class TokenHandler {
  api?: ApiRequestInterface
  storage?: BaseStorageInterface
  debugMode: boolean
  token: string|null
  payload?: TokenPayloadInterface|null
  data?: TokenDataInterface|null
  type?: TokenType|null
  expiredAt?: string
  isLogin: boolean
  timeout?: ReturnType<typeof setTimeout> | null
  readonly storageKey: TokenStorageKey

  constructor() {
    this.debugMode = false
    this.storageKey = 'member_token'
    this.token = null
    this.isLogin = false
    this._init()
  }

  private _init() {
    if (!process.client) {
      return
    }

    this.storage = EagleStorage()

    if(this.storage.get('tokenDebug', false)) {
      this.debugMode = true
    }

    this._refreshData()

    // token過期或格式錯誤就清除
    if(!this._isValid()) {
      this.clean()
      return
    }

    this._countdown()
  }

  private _refreshData() {
    this.token = this.get()
    this.payload = this.parsePayload()
    this.data = this.getData()
    this.type = this.getType()
    this.expiredAt = appLodash.get(this.payload, 'expired_at') as string
    this.isLogin = this._isValid()
  }

  private _isValid() : boolean {
    if(!this.get()) return false
    const exp = this.payload?.exp
    if(!exp) return false
    const now = helper.currentTimestamp()
    return exp > now
  }

  get() : string|null {
    return this.storage?.get(this.storageKey, false) || null
  }

  parsePayload() : TokenPayloadInterface|null {
    const token = this.get()
    if(!token) return null
    try {
      const base64Payload = (token.split('.')[1]).replace(/-/g, '+').replace(/_/g, '/')
      const decodedPayload = decodeURIComponent(atob(base64Payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''))
      return JSON.parse(decodedPayload)
    } catch(error) {
      console.warn(error)
      return null
    }
  }

  getData() : TokenDataInterface|null {
    return appLodash.get(this.payload, 'data') as TokenDataInterface|null
  }

  getType() : TokenType|null {
    const payload = this.parsePayload()
    if(!payload) return null
    return payload.type as TokenType
  }

  getRoles() : string[] {
    const roles = this.getDataProperty('roles') as string[]
    if(!Array.isArray(roles)) return []
    return roles
  }

  hasRole(requiredRoles: string[]) : boolean{
    const roles = this.getRoles()

    // 沒設定
    if(!Array.isArray(requiredRoles)) return true

    // 權限是工程帳號
    if(roles.indexOf('ROLE_MAINTAINER') > -1) return true

    for(const role of roles) {
      // token內的權限有一個是符合權限的設定
      if(requiredRoles.indexOf(role) > -1) return true
    }

    return false
  }

  clean(crossTabBroadcast: boolean = true) {
    if(!this.get()) {
      this._refreshData()
      return
    }
    this.storage?.delete(this.storageKey)
    this._refreshData()
    if (crossTabBroadcast) {
      crossTab.broadcast(crossTabEvents.CLEAN_TOKEN, null)
    }
  }

  set(token: string | null, crossTabBroadcast: boolean = true) : void {
    if(this.get() == token) return
    if (crossTabBroadcast) {
      crossTab.broadcast(crossTabEvents.SET_TOKEN, { token })
    }
    this.storage?.set(this.storageKey, token)
    this._refreshData()
    this._countdown()
  }

  // 取得剩餘時間(單位: 秒)
  private _getTokenSurplusTime() : number {
    if(!this.get()) return -1
    const payload = this.parsePayload()
    if(!payload) return -1
    const surplusTime = (payload.exp - helper.currentTimestamp()) as number
    return appLodash.round(surplusTime, 3)
  }

  private _countdown() : void {
    if(!this.get()) return
    const surplusTime = this._getTokenSurplusTime()

    // 剩餘N秒執行renew(N秒介於5-10分鐘), 用random避免多tab同時renew
    const renewAt = appLodash.random(5*60, 10*60)
    // const renewAt = 3595 // debug, 可使用每5秒更新一次token確認
    let timeoutSecond = appLodash.round(surplusTime - renewAt, 3)
    if(timeoutSecond > 86400*10) timeoutSecond = 86400*10 // 避免setTimeout時間太大失效變成立即執行
    this.debugLog(`${surplusTime}秒後到期, ${timeoutSecond}秒後將自動更新`)

    // 剩餘時間>5分鐘
    if(surplusTime > renewAt) {
      this.timeout = setTimeout(() => {
        this.renew()
      }, timeoutSecond * 1000)
      return
    }

    // 剩餘時間在5分鐘內
    if (surplusTime <= renewAt && surplusTime > 0) {
      this.renew()
      return
    }

    // token過期直接清除
    this.clean()
  }

  // 更新token
  async renew() {
    await helper.delay(2)
    // api尚未初始化完成, 等一下後再call一次renew method
    if(!this.api) {
      window.setTimeout(() => {
        this.renew()
      }, 2000)
      return
    }

    try {
      const result = await this.api.collection[`${this.type}AccountApi`].renewToken()
      this.set(result.token)
    } catch (error) {
      console.error(error)
    }
  }

  getDataProperty(property: string) : any {
    return appLodash.get(this.data, property)
  }

  setupApi(api: ApiRequestInterface) {
    this.api = api
  }

  debugLog(...args: any[]) : void {
    if(!this.debugMode) return
    console.warn('[Token Debug]', ...args)
  }

  // 建立測試用的token payload
  debugTokenPayload() {
    return {
      "iss": "http://localhost:9000",
      "aud": "http://localhost:8888",
      "jti": "jwt-1680562811387480",
      "iat": 1680562811.387299,
      "exp": 4836236447.387299,
      "expired_at": "2123-01-01 00:00:11",
      "id": "ciao",
      "type": "member",
      "data": {
        "id": "demo-account",
        "email": "foobar@gmail.com",
        "name": "Ciao",
        "created_at": "2023-03-25 16:18:28",
        "updated_at": "2023-03-30 15:09:52"
      }
    }
  }

  // 建立測試用的token
  createDebugToken() : string {
    const header = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`
    const verifySignature = `PBEJZ2e4OitqFYmG6vf6DuYC_QDQWEpyYGfZxxzl0pM`
    const payload = this.debugTokenPayload()

    const uint8Array = (new TextEncoder()).encode(JSON.stringify(payload))

    // @ts-ignore
    const base64Payload = btoa(String.fromCharCode.apply(null, uint8Array))
    return `${header}.${base64Payload}.${verifySignature}`
  }
}

export default new TokenHandler()

export interface TokenHandlerInterface {
  isLogin: boolean
  token: string|null
  payload?: TokenPayloadInterface|null
  data?: TokenDataInterface|null
  type?: TokenType|null
  expiredAt?: string
  setupApi: (api: ApiRequestInterface) => void
  hasRole: (requiredRoles: string[]) => boolean
  clean: (crossTabBroadcast?: boolean) => void
  get: () => string|null
  set: (token: string|null, crossTabBroadcast?: boolean) => void
  createDebugToken: () => string
  getRoles: () => string[]
}
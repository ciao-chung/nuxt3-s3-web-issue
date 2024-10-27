// @ts-ignore
import qs from 'qs'
// @ts-ignore
import fingerprintjs from 'fingerprintjs'

import {Router, RouteLocation} from 'vue-router'

type OauthLoginData = {
  provider: string // provider: google, facebook, line, apple
  clientKey: string
  successPath?: any // 登入成功後導向頁面
  metaData?: any
  keepLogin: boolean
  keepEmail: boolean
  isDebugMode?: boolean
  redirectUri?: string  // 自訂redirectUri, 沒有則為登入的redirectUri
}

export type OauthReturnData = {
  access_token: string
  code?: string
  state: {
    successPath?: string
    redirectUri: string
    keepLogin: boolean
    keepEmail: boolean
    isDebugMode: boolean
  }
}

class oauth {
  private isDebugMode?: boolean
  private keepLogin?: boolean
  private keepEmail?: boolean
  private successPath?: any
  private redirectUri?: string
  
  // @ts-ignore
  login(router: Router, data: OauthLoginData) {
    this.isDebugMode = data.isDebugMode === true
    this.keepLogin = data.keepLogin
    this.keepEmail = data.keepEmail
    this.successPath = data.successPath || null
    this._setupRedirectUri(router, data.provider)
    if(data.redirectUri) this.redirectUri = data.redirectUri

    let url
    const urlMethod = this.getUrlMethod(data.provider, data.clientKey, data.metaData)
    if (typeof this.getUrlMethod != 'function') {
      throw new Error(`oauth provider ${data.provider} undefined`)
      return
    }
    url = urlMethod(data.clientKey, data.metaData)
    window.location.assign(url)
  }

  getUrlMethod(provider: string, clientKey: string, metaData: any) : Function {
  // @ts-ignore
    return () => this[`_${provider}LoginUrl`](clientKey, metaData)
  }

  _setupRedirectUri(router: Router, provider: string) {
    const host = `${window.location.origin}`
    const href = router.resolve({
      name: 'oauth-return',
      params: { provider },
    }).href
    this.redirectUri = `${host}${href}`
  }

  _getOauthState(metaData = {}) {
    const fingerprint = new fingerprintjs().get()
    const timestamp = (new Date()).getTime()
    let state = {
      device: fingerprint,
      timestamp,
      redirectUri: this.redirectUri,
      keepLogin: this.keepLogin,
      keepEmail: this.keepEmail,
      isDebugMode: this.isDebugMode,
      successPath: undefined,
      ...metaData,
    }
    if(this.successPath) {
      state.successPath = this.successPath
    }
    return state
  }

  _googleLoginUrl(clientKey: string, metaData = {}) {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    let query = {
      client_id: clientKey,
      response_type: 'code',
      scope: 'openid email https://www.googleapis.com/auth/userinfo.profile',
      state: JSON.stringify(this._getOauthState(metaData)),
      redirect_uri: this.redirectUri,
    }
    const queryString = qs.stringify(query, { encode: false })
    return `${baseUrl}?${queryString}`
  }

  _facebookLoginUrl(clientKey: string, metaData = {}) {
    const baseUrl = 'https://www.facebook.com/v7.0/dialog/oauth'
    let query = {
      client_id: clientKey,
      response_type: 'code',
      scope: 'public_profile email',
      state: JSON.stringify(this._getOauthState(metaData)),
      redirect_uri: this.redirectUri,
    }
    const queryString = qs.stringify(query, { encode: false })
    return `${baseUrl}?${queryString}`
  }

  _lineLoginUrl(clientKey: string, metaData = {}) {
    const baseUrl = 'https://access.line.me/oauth2/v2.1/authorize'

    // line登入頁如果url帶 { } 符號會400, 所以要先去掉頭尾的 { }
    let stateString = JSON.stringify(this._getOauthState(metaData))
    stateString = stateString.slice(0, -1)
    stateString = stateString.substring(1)
    let query = {
      client_id: clientKey,
      response_type: 'code', // line的oauth response type只接受code flow
      scope: 'profile openid email',
      state: stateString,
      redirect_uri: this.redirectUri,
    }
    const queryString = qs.stringify(query, {
      encode: false,
    })
    return `${baseUrl}?${queryString}`
  }

  getReturnData(provider: string, route: RouteLocation) : OauthReturnData {
    // @ts-ignore
    const _getReturnData = () => this[`_${provider}ReturnData`](route)
    // if(typeof _getReturnData != 'function') {
    //   throw new Error(`oauth provider ${provider} undefined`)
    // }

    return _getReturnData()
  }

  _getOriginCallbackDataObject(data: any) {
    try {
      return qs.parse(data)
    } catch (e) {
      console.error(e)
      return null
    }
  }

  _googleReturnData(route: RouteLocation) {
    const originData = this._getOriginCallbackDataObject(route.query)
    if(!originData) return null

    let result = {
      ...originData,
    }
    result.access_token = originData.access_token
    // @ts-ignore
    result.state = JSON.parse(originData.state)
    return result
  }

  _facebookReturnData(route: RouteLocation) {
    const originData = this._getOriginCallbackDataObject(route.query)
    if(!originData) return null

    let result = {
      ...originData,
    }
    result.access_token = originData['#access_token']
    // @ts-ignore
    result.state = JSON.parse(originData.state)
    return result
  }

  _lineReturnData(route: RouteLocation) {
    const originData = this._getOriginCallbackDataObject(route.query)
    if(!originData) return null

    let result = {
      ...originData,
    }

    // 補回登入頁面砍掉的{ }
    let stateString = originData.state as string|undefined|null
    if (!stateString) {
      return {}
    }
    if (new RegExp(/\?/).test(stateString)) {
      stateString = stateString.split('?')[0]
    }
    try {
      result.state = JSON.parse(`{${stateString}}`)
      return result
    } catch (e) {
      console.error(e)
      return result
    }
    
  }
}

export default new oauth()

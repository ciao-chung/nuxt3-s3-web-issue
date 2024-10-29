import EagleStorage from 'core/libs/storage/localStorage'
import {appLodash} from 'core/libs/lodashLoader'
import apiRequest from 'core/libs/api/apiRequest'
import type {TokenType} from 'core/libs/token/token.type'
import {i18n} from '~/plugins/i18n'
import {notify} from '@kyvg/vue3-notification'
const $t = i18n.global.t
import {appPopup} from '@/plugins/popup'
import _validator from './validator'
import { useTokenStore } from '@/store/token'

class account {
  public storage: any

  constructor() {
    this.storage = process.client ? EagleStorage() : null
  }

  getStorageAccountProfile(type: TokenType) : any {
    return this.storage.get(`profile_${type}`, true)
  }

  cleanStorageAccountProfile(type: TokenType) : void {
    this.storage.delete(`profile_${type}`)
  }

  login(rememberEmail:boolean = false) {
    setTimeout(() => {
      const tokenStore = useTokenStore()
      const name = appLodash.get(tokenStore.data, 'name')
      notify({
        title: $t('notify.login.successfully'),
        text: $t('notify.welcome', { name }),
        type: 'success'
      })

      if(rememberEmail) {
        this._loginStoreLoginAccount()
      }

      else {
        this.cleanStorageAccountProfile('member')
      }
    }, 1000)
  }

  _loginStoreLoginAccount() {
    try {
      const tokenStore = useTokenStore()
      const tokenType = tokenStore.type
      const profile = {
        name: appLodash.get(tokenStore.data, 'name') || appLodash.get(tokenStore.data, 'email'),
        email: appLodash.get(tokenStore.data, 'email'),
      }
      this.storage.set(`profile_${tokenType}`, profile)
    } catch (error) {
      console.warn(error)
    }
  }

  logout() {
    const tokenStore = useTokenStore()
    const router = useRouter()
    const route = useRoute()
    appPopup.base({
      title: $t(`confirm.logout`),
      applyCallback: async () => {
        await this.logoutRequest()
        tokenStore.clean()
        router.push({
          name: 'login',
          query: {
            path: route.fullPath,
          }
        })
        setTimeout(() => {
          notify({
            title: $t('notify.logout.successfully'),
            type: 'success'
          })
        }, 1000)
      },
    })
  }

  async logoutRequest() {
    try {
      await apiRequest.collection.memberAccountApi.logout()
    } catch (error) {
      console.warn(error)
    }
  }

  delay(second: number = 1) : Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, second*1000)
    })
  }

  // 驗證身份
  async verifyIdentity(callback?: (() => void), closeCallback?: (() => void)) {
    const validator = _validator()
    await this.delay(0.5)
    appPopup.prompt({
      title: $t('action.verify_identity'),
      disabledApply: data => !validator.required(data),
      prompt: {
        maxlength: 20,
        title: $t('data.password'),
        inputType: 'password',
      },
      applyCallback: async (data) => {
        try {
          await apiRequest.collection.memberAccountApi.verifyIdentity({
            password: data,
          })
          notify({
            title: $t('notify.account_verify.successfully'),
            type: 'info',
          })
          if(typeof callback === 'function') callback()
        } catch (error) {
          console.error(error)
          notify({
            title: $t('notify.account_verify.failure'),
            text: $t('notify.account_verify.failure.content'),
            type: 'error',
          })
          throw error
        }
      },
    })
  }
}

export default () => new account()
export interface AccountInterface {
  login: (rememberEmail?: boolean) => void
  logout: () => void
  getStorageAccountProfile: (type: TokenType) => any
  cleanStorageAccountProfile: (type: TokenType) => void
  verifyIdentity: (
    callback?: (() => void),
    closeCallback?: (() => void)
  ) => Promise<void>
}

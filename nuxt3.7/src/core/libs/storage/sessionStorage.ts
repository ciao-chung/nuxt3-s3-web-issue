import CookieStorage from './cookie'
import type {BaseStorageInterface} from './storage.type'

class SessionStorage {
  public supportedSessionStorage: boolean
  private isNewTab: boolean
  private onSessionSync: boolean
  constructor() {
    this.supportedSessionStorage = false
    this.isNewTab = false
    this.onSessionSync = false
  }

  init() : void {
    const _testProperty = (Math.random()).toString()
    try {
      window.sessionStorage.setItem(_testProperty, _testProperty)
      window.sessionStorage.removeItem(_testProperty)
      this.supportedSessionStorage = true
    } catch (e) {
      this.supportedSessionStorage = false
      return
    }

    this.isNewTab = !window.sessionStorage.length
    this.onSessionSync = false
    this._requestSyncSessionStorage()
    this._listenLocalStorageChange()
  }

  all() : {[key: string]: any} {
    return window.sessionStorage
  }

  get(property: string) : any {
    try {
      let value = window.sessionStorage.getItem(property) || ''
      return JSON.parse(value)
    }
    catch(e) {
      return null
    }
  }

  set(property: string, value: any) : void {
    window.sessionStorage.setItem(property, JSON.stringify(value))
  }

  delete(property: string) : void {
    window.sessionStorage.removeItem(property)
  }

  _requestSyncSessionStorage() : void {
    if(!this.isNewTab) return
    window.localStorage.setItem('requestSyncSessionStorage', (Math.random()).toString())
    window.localStorage.removeItem('requestSyncSessionStorage')
  }

  _listenLocalStorageChange() : void {
    const self = this
    window.addEventListener('storage', (event) => {
      if(!event.newValue) return

      // 收到其他tab的sessionStorage同步請求, 開始同步
      if(event.key == 'requestSyncSessionStorage') {
        self._syncSessionStorage()
        return
      }

      // 新開的tab收到請求來的sessionStorage, 取出寫回sessionStorage
      if(event.key == 'sessionStorage' && !self.onSessionSync) {
        self.onSessionSync = true
        const _sessionStorageData = JSON.parse(event.newValue)
        window.sessionStorage.clear()
        for(const key in _sessionStorageData) {
          window.sessionStorage.setItem(key, _sessionStorageData[key])
        }
        self.onSessionSync = false

        // 廣播session更新事件
        window.dispatchEvent(new Event('sessionUpdate'))
      }
    }, false)
  }

  _syncSessionStorage() : void {
    if(this.onSessionSync) return
    this.onSessionSync = true
    window.localStorage.setItem('sessionStorage', JSON.stringify(window.sessionStorage))
    window.localStorage.removeItem('sessionStorage')
    this.onSessionSync = false
  }
}

const generateStorage = () => {
  const _sessionStorage = new SessionStorage()
  _sessionStorage.init()
  if(_sessionStorage.supportedSessionStorage) return _sessionStorage
  const cookieStorage = new CookieStorage()
  cookieStorage.init()
  return cookieStorage
}

export default () : BaseStorageInterface => <BaseStorageInterface>generateStorage()
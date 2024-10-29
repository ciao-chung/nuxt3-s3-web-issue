import CookieStorage from './cookie'
import type {BaseStorageInterface} from './storage.type'

class LocalStorage {
  public supportedLocalStorage: boolean
  constructor() {
    this.supportedLocalStorage = false
  }

  init() : void {
    const _testProperty = (Math.random()).toString()
    try {
      window.localStorage.setItem(_testProperty, _testProperty)
      window.localStorage.removeItem(_testProperty)
      this.supportedLocalStorage = true
    } catch (e) {
      this.supportedLocalStorage = false
      return
    }
  }

  all() : {[key: string]: any} {
    return window.localStorage
  }

  get(property: string, jsonFormat: boolean = true) : any {
    try {
      let value = window.localStorage.getItem(property) || ''
      if(!jsonFormat) return value || null
      if(!value) return null
      return JSON.parse(value)
    }
    catch(e) {
      console.warn(`local storage parse warning: ${property}`)
      console.warn(e)
      return null
    }
  }

  set(property: string, value: any) : void {
    if (typeof value != 'object') {
      window.localStorage.setItem(property, value)
      return
    }
    window.localStorage.setItem(property, JSON.stringify(value))
  }

  delete(property: string) : void {
    window.localStorage.removeItem(property)
  }
}

const generateStorage = () => {
  const _localStorage = new LocalStorage()
  _localStorage.init()
  if(_localStorage.supportedLocalStorage) return _localStorage
  const cookieStorage = new CookieStorage()
  cookieStorage.init()
  return cookieStorage
}

export default () : BaseStorageInterface => <BaseStorageInterface>generateStorage()
export type {
  BaseStorageInterface
}
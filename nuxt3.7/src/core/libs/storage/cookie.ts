import type {BaseStorageInterface} from './storage.type'
declare type AnyObject = {[key: string]: any}
class CookieStorage {
  private data: AnyObject
  private readonly storageItemName: string;
  constructor() {
    this.data = {}
    this.storageItemName = 'cookieStorage'
  }

  init() : void {
    if(document.cookie.trim() == '') return
    const _cookies = decodeURI(document.cookie).split(`${this.storageItemName}=`)[1]
    try {
      this.data = JSON.parse(_cookies)
    } catch (e) {
      this.data = {}
    }
  }

  all() : AnyObject {
    return this.data
  }

  get(property: string) : any {
    if(document.cookie.trim() == '') return null
    let result = this.data[property]
    if(!result) return null
    return result
  }

  set(property: string, value: any) : void {
    this.data[property] = value
    this._write()
  }

  delete(property: string) : void {
    delete this.data[property]
    this._write()
  }

  _write() : void {
    document.cookie = `${this.storageItemName}=${encodeURI(JSON.stringify(this.data))}`
  }

  originAll() : AnyObject {
    let result: AnyObject = {}
    for (const item of document.cookie.trim().split(';')) {
      const partials = item.split('=') as string[]
      result[partials[0].trim()] = partials[1].trim()
    }
    return result
  }

  originGet(property: string, jsonFormat: boolean = true) : any {
    const items = this.originAll()
    try {
      let value = items[property]
      if(!jsonFormat) return value || null
      return JSON.parse(value)
    }
    catch(e) {
      return null
    }
  }
}

export default CookieStorage
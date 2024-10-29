import storage from '../libs/storage/localStorage.js'
const STORAGE_LOCALE_KEY = 'eagle.site_locale'
class language {
  protected storage: any
  constructor() {
    this.storage = storage()
  }

  getQueryLanguage() : string|null {
    let lang = null
    try {
      lang = (new URLSearchParams(window.location.search)).get('lang')
    } catch (error) {
      return null
    }
    return lang
  }

  init() {
    const queryLanguage = this.getQueryLanguage()
    if(queryLanguage) {
      return this.setLanguageToStorage(queryLanguage)
    }
  }

  setLanguageToStorage(language: string|null) : void{
    if(!language) return
    this.storage.set(STORAGE_LOCALE_KEY, language)
  }

  get() : string {
    const browserLanguage = navigator.language
    const storageLanguage = this.storage.get(STORAGE_LOCALE_KEY, false)
    if(storageLanguage) return storageLanguage
    return browserLanguage
  }
}

export default new language()
import linkifyHtml from 'linkify-html'
import dayjs from 'dayjs'
import type {AnyObject} from '@/types/base'
import { appLodash } from 'core/core'

class Helper {
  public device: string
  public isMobile: boolean

  constructor() {
    this.device = 'lg'
    this.isMobile = false
  }

  setupDevice(device: string, isMobile: boolean) {
    this.device = device
    this.isMobile = isMobile
  }

  now(format: string = 'YYYY-MM-DD HH:mm:ss') : string {
    return dayjs().format(format)
  }

  timeFormat(time: any, format: string = 'YYYY-MM-DD HH:mm:ss') : string {
    return dayjs(time).format(format)
  }

  delay(second: number = 1) : Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, second*1000)
    })
  }

  focus(selector: string, $el?: HTMLElement) : void {
    const $target = !$el ? $(selector) : $($el).find(selector)
    $target.focus()
  }

  currentTimestamp() : number {
    return Math.floor(new Date().getTime()/1000)
  }

  getSiteUserName(user: any) {
    if(!user) return null
    const email = user.email
    const name = user.name
    return name || email
  }

  getSuffixListByDevice() : string[] {
    if(this.device === 'xs') return ['middle','small', 'tiny']
    if(this.device === 'sm') return ['middle','small', 'tiny']
    if(this.device === 'md') return ['middle', 'small', 'tiny']
    if(this.device === 'lg') return ['large', 'middle', 'small', 'tiny']
    return ['xlarge', 'large', 'middle', 'small', 'tiny']
  }

  getPhotoUrl(photo: any, suffixList?: string[]) : string|null {
    if (!photo) {
      return null
    }
    if (photo.url) {
      return photo.url
    }
    if (!photo.size_list) {
      return null
    }
    if (!suffixList) {
      suffixList = this.getSuffixListByDevice()
    }
    const originUrl = photo.size_list.origin.url
    for(const suffix of suffixList) {
      if(photo.size_list[suffix] && photo.size_list[suffix].url) {
        return photo.size_list[suffix].url
      }
    }
    return originUrl
  }

  getPhotoListFirstItem(photos: any, suffixList?: string[]) : string|null {
    if(!Array.isArray(photos)) return null
    const photoList = photos.filter(photo => !!photo)
    if(photoList.length == 0) return null
    return photoList[0] || null
  }

  getComputedPhotoList(photos: any) : null|AnyObject[] {
    if(!Array.isArray(photos)) return null
    const validPhotos = photos.filter(photo => !!photo)
    if(validPhotos.length == 0) return null
    return validPhotos
  }

  checkPasswordStrengthLevel(password: any) : 'strong'|'medium'|'weak'|null {
    if(typeof password != 'string') return null

    // 八個字元以上且包含大小寫字母、數字、特殊符號
    if(new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/g).test(password) === true) {
      return 'strong'
    }

    // 六個字元以上，「包含英文大小寫字母」或「包含英文及特殊符號」
    if(new RegExp(/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,})/g).test(password) === true) {
      return 'medium'
    }
    return 'weak'
  }

  isImage(file: File) : boolean {
    if(file instanceof File === false) return false
    if(new RegExp(/image\/png/).test(file.type)) return true
    if(new RegExp(/image\/jpg/).test(file.type)) return true
    if(new RegExp(/image\/jpeg/).test(file.type)) return true
    if(new RegExp(/image\/gif/).test(file.type)) return true
    return false
  }

  getFileUrl(file: any) : null|undefined|string {
    if(!file) return null
    if(file.url) return file.url
    if(typeof file.path != 'string') return null
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL
    return `${fileBaseUrl}${file.path}`
  }

  textEmpty(data: string|null|undefined) : boolean {
    if (data === null || data === undefined) {
      return true
    }
    return appLodash.isEmpty(appLodash.trim(data))
  }

  nestedSetNodeNamePrefix(name: any, depth: number, prefix?: string) : string {
    if (!prefix) prefix = ' - '
    const prefixString = prefix.repeat(depth-1)
    return `${prefixString} ${name}`
  }

  gradient(start: number = 0.1, end: number = 0.3, direction: number = 180) {
    return `${direction}deg, rgba(0, 0, 0, ${start}), rgba(0, 0, 0, ${end})`
  }

  getYoutubeImage(uid: any) : string|null {
    if (typeof uid != 'string') {
      return null
    }
    return `https://img.youtube.com/vi/${uid}/hqdefault.jpg`
  }

  getYoutubeUid(url: any) : string|null {
    if (typeof url != 'string') {
      return null
    }

    // 短網址形式
    const short_pattern = /(https:\/\/youtu\.be\/)(.*)/
    if (url.match(short_pattern)) {
      let uid = url.replace(short_pattern, '$2')
      const hasQuery = new RegExp(/\?/).test(uid)
      if (hasQuery) {
        uid = uid.split('?')[0]
      }
      return uid
    }

    // 正常形式
    const partial = url.split('v=')
    if (typeof partial[1] != 'string') {
      return null
    }
    const uid = partial[1].split('&')[0]
    return uid
  }

  getVideoPhoto(video: AnyObject|null, property?: string|string[]) : AnyObject|null {
    if (!video) {
      return null
    }
    if (video.photo) {
      return video.photo
    }
    if (!property) {
      property = 'youtube_url'
    }
    const uid = this.getYoutubeUid(appLodash.get(video, property))
    const youtubeImage = this.getYoutubeImage(uid)
    if (!youtubeImage) {
      return null
    }
    return {
      url: youtubeImage
    }
  }

  removeNestedDataEmptyChildren(items: any[], childrenKey: string = 'children') : void {
    if (!Array.isArray(items)) {
      console.warn('data is not array', items)
      return
    }
    items.forEach(item => {
      if (item[childrenKey] && item[childrenKey].length === 0) {
        delete item[childrenKey]
      } else if (item[childrenKey]) {
        this.removeNestedDataEmptyChildren(item[childrenKey])
      }
    })
  }

  scrollToDivBottom(selector: string, time: number = 500) : void {
    const $target = $(selector)
    if ($target.length === 0) {
      console.warn(`scrollToDivBottom: ${selector} is not found`)
      return
    }
    $target.animate({
      scrollTop: $target.prop('scrollHeight')
    }, time)
  }

  nl2br(data: string|null) : string {
    if (data === null || data === undefined) {
      return ''
    }

    if (typeof data == 'object' || Array.isArray(data)) {
      return JSON.stringify(data)
    }

    if (typeof data != 'string') {
      return ''
    }
    
    const result = String(data).replace(/(?:\r\n|\r|\n)/g, '<br>')
    if (!result) {
      return ''
    }
    if (result == null || result == 'null') {
      return ''
    }

    // linkfyjs options: https://soapbox.github.io/linkifyjs/docs/options.html
    return linkifyHtml(result, {
      target: {
        url: '_blank'
      },
    })
  }

  findDeep(data: any[], identity: any, options: AnyObject = {}) : any {
    const {identityProperty = 'id'} = options
    for (let item of data) {
      if (item[identityProperty] === identity) {
        return item
      }
      if (item.children && item.children.length > 0) {
        let found = this.findDeep(item.children, identity)
        if (found) {
          return found
        }
      }
    }
    return null
  }
}

export default new Helper()

export interface HelperInterface {
  device: string
  isMobile: boolean
  now(format?: string) : string
  timeFormat(time: any, format?: string) : string
  delay(second?: number) : Promise<void>
  focus(selector: string, $el?: HTMLElement) : void
  getSiteUserName: (user: any) => any
  getPhotoUrl: (photo: any, suffixList?: string[]) => string|null
  getPhotoListFirstItem: (photos: any, suffixList?: string[]) => string|null
  getComputedPhotoList(photos: any) : null|AnyObject[]
  checkPasswordStrengthLevel(password: any) : 'strong'|'medium'|'weak'|null
  isImage(file: File) : boolean
  getFileUrl(file: any) : null|undefined|string
  textEmpty(data: string|null|undefined) : boolean
  nestedSetNodeNamePrefix(name: any, depth: number, prefix?: string) : string
  gradient: (start?: number|undefined, end?: number|undefined, direction?: number|undefined) => string
  getYoutubeImage(uid: any) : string|null
  getYoutubeUid(url: any) : string|null
  getVideoPhoto(video: AnyObject|null, property?: string|string[]) : AnyObject|null
  removeNestedDataEmptyChildren(items: any[], childrenKey?: string) : void
  scrollToDivBottom(selector: string, time?: number) : void
  nl2br(data: string|null) : string
  findDeep(data: any[], identity: any, options?: AnyObject) : any
}
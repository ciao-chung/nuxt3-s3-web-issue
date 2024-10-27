/**
 * ref: https://github.com/tejacques/crosstab
 */

// @ts-ignore
import crossTabLibrary from 'crosstab'
import type {AnyObject} from '@/types/base'
export type CrossTabMessage = {
  id: string
  event: string
  data: any
  destination: string
  origin: string
  timestamp: number
}

const currentTabId = crossTabLibrary.id
class CrossTab {
  on(eventName: string, callback: ((event: CrossTabMessage, tabId: any) => void)|null) {
    try {
      crossTabLibrary.on(eventName, (event: CrossTabMessage) => {
        if(currentTabId == event.origin) return
        if(typeof callback != 'function') return
        callback(event, crossTabLibrary.id)
      })
    } catch(error) {
      console.warn('error', error)
      console.log(`device not support crosstab [${eventName}]`)
    }
  }

  broadcast(eventName: string, data: AnyObject|null) {
    try {
      crossTabLibrary.broadcast(eventName, data , null)
    } catch(error) {
      console.warn('error', error)
      console.log(`device not support crosstab [${eventName}]`)
    }
  }
}

export default new CrossTab()
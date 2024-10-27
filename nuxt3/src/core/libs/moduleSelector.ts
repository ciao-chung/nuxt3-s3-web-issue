import type {PopupHelperInterface} from '@/plugins/popup/types'
import {appPopup} from '@/plugins/popup'
import {appLodash} from 'core/core'

export interface ModuleSelectorConfigInterface {
  multiple?: true
  max?: number
  usedList?: any[]|null
  applyCallback: (data: any) => any
  closeCallback?: (() => any)
  usedListMatchCallback?: (() => boolean)|null
  meta?: any
}

export interface ModuleSelectorInternalConfigInterface {
  multiple?: true
  max?: number
  title: string
  bodySlot: any
  usedList?: any[]|null
  applyCallback: (data: any) => any
  closeCallback?: (() => any)
  usedListMatchCallback?: (() => boolean)|null
  meta?: any
}

class ModuleSelector {
  public active(config: ModuleSelectorInternalConfigInterface) {
    let max:any = undefined
    if(config.max === undefined) {
      max = config.multiple === true ? 0 : 1
    }

    appPopup.base({
      title: config.title,
      width: '80vw',
      bodySlot: config.bodySlot,
      persistent: true,
      // 在資料變更時，更新標題更新選取得資料筆數
      onDataChange: (popupHelper: PopupHelperInterface) => {
        const quantity = this._getDataLength(popupHelper.data)
        let title = `${popupHelper.title}(${quantity})`
        if (max != 0) {
          title = `${popupHelper.title}(${quantity}/${max})`
        }
        popupHelper.setTitle(title)
      },
      disabledApply: (data: any) : boolean => {
        if (!Array.isArray(data)) return true
        const length = data.length
        if (length == 0) return true
        if (length > max && max != 0) return true
        return false
      },
      applyCallback: data => {
        const result = this._getApplyData(data, config.multiple === true)
        config.applyCallback(result)
      },
      closeCallback: config.closeCallback,
      moduleSelectorConfig: {
        max,
        multiple: config.multiple === true,
        usedListMatchCallback: config.usedListMatchCallback || null,
        usedList: !Array.isArray(config.usedList) ? [] : appLodash.cloneDeep(config.usedList),
      },
      meta: {
        ...config.meta,
      },
    })
  }

  private _getDataLength(data: any) : number {
    if(!data) return 0
    if(!Array.isArray(data)) return 1
    return data.length
  }

  private _getApplyData(data: any, multiple: boolean) {
    if(!Array.isArray(data)) return null
    if(!multiple) return data[0] || null
    return data
  }
}

export default new ModuleSelector()

export interface ModuleSelectorInterface {
  active: (config: ModuleSelectorInternalConfigInterface) => void
}

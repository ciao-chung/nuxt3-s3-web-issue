import {appLodash} from 'core/libs/lodashLoader'
import {i18n} from '~/plugins/i18n'
const $t = i18n.global.t

// @ts-ignore
import validator from 'validator'

class Validator {
  email(data: any) : boolean {
    if (typeof data != 'string') {
      return false
    }
    if (validator.isEmail(data) === false) {
      return false
    }
    return true
  }

  emailRule(data: any) : boolean|string{
    return this.email(data) || $t('validate.error.email_incorrect')
  }

  textMustAtLeast(data: any, length: number) {
    if(typeof data != 'string') return false
    return validator.isLength(data, { min: length })
  }

  textMustAtLeastRule(data: any, length: number) : boolean|string{
    return this.textMustAtLeast(data, length) || $t('validate.error.text_too_less', { length })
  }

  required(data: any) {
    return !appLodash.isEmpty(appLodash.trim(data))
  }

  requiredRule(data: any) : boolean|string{
    return this.required(data) || $t('validate.error.required')
  }

  passwordValidate(password: any) {
    if (!this.required(password)) {
      return false
    }
    if (!this.textMustAtLeastRule(password, 4)) {
      return false
    }
    return true
  }

  phoneNumberGlobal(string: string|null) : boolean {
    if(!string) return false
    const patten = /^((\+)\d{3})[1-9](\d{2}){4}$/
    return new RegExp(patten).test(string)
  }

  // 手機
  phoneNumberLocal(string: string|null) : boolean {
    if(!string) return false
    const patten = /^09\d{8}$/
    return new RegExp(patten).test(string)
  }

  // 市話
  telNumberLocal(string: string|null) : boolean {
    if(!string) return false
    const patten = /^0\d{8,9}$/
    return new RegExp(patten).test(string)
  }

  phoneNumberGlobalRule(data: any) : boolean|string{
    return this.phoneNumberGlobal(data) || $t('validate.error.phone_number_incorrect')
  }

  phoneNumberLocalRule(data: any) : boolean|string{
    return this.phoneNumberLocal(data) || $t('validate.error.phone_number_incorrect')
  }

  noWhitespace(value: any) : boolean {
    if(typeof value != 'string') return true
    return /\s/g.test(value) == false
  }

  noWhitespaceRule(data: any) : boolean|string{
    return this.noWhitespace(data) || $t('validate.error.required')
  }

  /**
   * 字元檢查(黑名單字元), return true代表檢查通過
   * @param value
   * @param blacklist 黑名單字元檢查
   */
  charValid(value: any, blacklist: string[]) : boolean {
    if(typeof value != 'string') return true
    for(const invalidChar of blacklist) {
      if(new RegExp(invalidChar, 'g').test(value) === true) return false
    }
    return true
  }

  /**
   * 嚴格字串檢查
   * - 不可有空白
   * - 不可有特殊符號: ^ ' ` ! @ # % & * + \ " < >|_ [ ] 。
   * @param value
   */
  strictStringValid(value: any) : boolean {
    if(typeof value != 'string') return true
    const charBlackList = ['\\^', '\'', '`', '!', '@', '#', '\\%', '&', '\\*', '\\+', '"', '<', '>', '\\|', '_', '\\[', '\\]', '。']
    if(!this.charValid(value, charBlackList)) return false
    return true
  }

  onlyNumber(value: any) : boolean {
    if(!value) return false
    return new RegExp(/^\d+$/).test(value)
  }
}

export default () => new Validator()
export interface ValidatorInterface {
  email: (data: any) => boolean
  emailRule: (data: any) => boolean|string
  textMustAtLeast: (data: any, length: number) => boolean
  textMustAtLeastRule: (data: any, length: number) => boolean|string
  required: (data: any) => boolean
  requiredRule: (data: any) => boolean|string
  telNumberLocal: (string: string|null) => boolean
  phoneNumberLocal: (string: string|null) => boolean
  phoneNumberLocalRule: (data: any) => boolean|string
  phoneNumberGlobal: (string: string|null) => boolean
  phoneNumberGlobalRule: (data: any) => boolean|string
  noWhitespace(value: any) : boolean
  charValid(value: any, blacklist: string[]) : boolean
  strictStringValid(value: any) : boolean
  onlyNumber(value: any) : boolean
}

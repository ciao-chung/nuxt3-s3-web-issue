import helper, {type HelperInterface} from './libs/helper/helper'
import {appLodash} from './libs/lodashLoader'
import EagleStorage, {type BaseStorageInterface} from './libs/storage/localStorage'
import {notify} from '@kyvg/vue3-notification'

export {
  appLodash,
  helper,
  EagleStorage,
  notify,
}

export type {
  HelperInterface,
  BaseStorageInterface,
}
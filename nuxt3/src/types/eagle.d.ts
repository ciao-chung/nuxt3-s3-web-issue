import type {App, ComponentInternalInstance} from 'vue'
import {apiRequest, tokenHandler, type HelperInterface, appLodash} from 'core/core'
import type {BaseStorageInterface} from 'core/core'
import type {ModuleSelectorInterface} from 'core/libs/moduleSelector'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $helper: HelperInterface
    $appApi: typeof apiRequest
    $eagleApp: typeof App
    $appLodash: typeof appLodash
    $storage: BaseStorageInterface
    $tokenHandler: typeof tokenHandler
    $moduleSelector: ModuleSelectorInterface
  }
}

declare global {
  interface Window {
    rootComponent: ComponentInternalInstance|null
  }
}
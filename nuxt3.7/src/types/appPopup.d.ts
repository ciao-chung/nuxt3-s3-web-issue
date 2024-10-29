import {appPopup} from '@/plugins/popup'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $appPopup: typeof appPopup
  }
}

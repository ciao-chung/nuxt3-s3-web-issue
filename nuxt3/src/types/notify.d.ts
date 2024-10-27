import {notify} from '@/plugins/notify'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: typeof notify
  }
}

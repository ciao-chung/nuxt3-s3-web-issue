import {systemBar} from '@/plugins/systemBar'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $systemBar: typeof systemBar
  }
}

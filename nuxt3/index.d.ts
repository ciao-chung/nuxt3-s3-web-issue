import {type AppHelperInterface} from 'core/libs/appHelper'

declare module '#app' {
  interface NuxtApp {
    appHelper: AppHelperInterface
    $appHelper: AppHelperInterface
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    appHelper: AppHelperInterface
    $appHelper: AppHelperInterface
  }
}

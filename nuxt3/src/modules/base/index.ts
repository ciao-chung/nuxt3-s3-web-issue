import type {
  ModuleConfigInterface,
  EagleModule,
} from '@/types/base'

import moduleRoute from '@/modules/base/config/route'
import moduleSidebar from '@/modules/base/config/sidebar'
import moduleApi from '@/modules/base/api/api'

class ModuleConfig implements ModuleConfigInterface {
  async launch() {

  }


  get(): EagleModule {
    return {
      launch: this.launch,
      routes: moduleRoute,
      sidebar: moduleSidebar,
      api: moduleApi,
    }
  }
}

export default new ModuleConfig()
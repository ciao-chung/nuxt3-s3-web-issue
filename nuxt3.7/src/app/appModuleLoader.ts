import deepmerge from 'deepmerge'
import _cloneDeep from 'lodash/cloneDeep'
import type {
  EagleModule,
  EagleModuleRoute,
  EagleModuleSidebar,
} from '@/types/base'
import modules from '@/modules'

class AppModuleLoader {
  private routes: EagleModuleRoute
  private sidebar: EagleModuleSidebar
  private readonly modules: {[key: string]: EagleModule}
  constructor() {
    this.modules = {}
    this.routes = {
      public: [],
      nonLogin: [],
      member: [],
    }
    this.sidebar = {
      public: [],
      nonLogin: [],
      member: [],
    }
  }

  init() {
    this.routes = {
      public: [],
      nonLogin: [],
      member: [],
    }
    this.sidebar = {
      public: [],
      nonLogin: [],
      member: [],
    }

    for(const [moduleName, moduleConfig] of Object.entries(modules)) {
      this.modules[moduleName] = moduleConfig.get()
      moduleConfig.launch()
    }

    // 合併各個module內的設定
    this.iterateModules((moduleName: string, moduleConfig: EagleModule) => {
      this.routes = deepmerge(this.routes, moduleConfig.routes)
      this.sidebar = deepmerge(this.sidebar, moduleConfig.sidebar)
    })
  }

  iterateModules(callback: (moduleName: string, moduleConfig: EagleModule) => void) {
    for(const moduleName in this.modules) {
      const moduleConfig = _cloneDeep(this.modules[moduleName])
      callback(moduleName, moduleConfig)
    }
  }

  getRoutes() : EagleModuleRoute {
    return this.routes
  }

  getSidebarConfig() : EagleModuleSidebar {
    return this.sidebar
  }

  private async _getIi18nConfigFromFolder(i18nJsonFiles: {[key: string]: Function}) {
    const result: {[key: string]: any} = {}
    for (const path in i18nJsonFiles) {
      const i18nJson = (await i18nJsonFiles[path]())
      const language = (path.match(/\/i18n\/([a-zA-Z-]+)\.js$/) as any[])[1]
      result[language] = deepmerge(result[language] || {}, i18nJson)
    }
    return result
  }

  async getI18nConfig () : Promise<any> {
    const baseI18n = await this._getIi18nConfigFromFolder(
      import.meta.glob('../core/i18n/*.js', {
        import: 'default',
      })
    )
    const moduleI18n = await this._getIi18nConfigFromFolder(
      import.meta.glob('../modules/**/i18n/*.js', {
        import: 'default',
      })
    )
    return deepmerge(baseI18n, moduleI18n)
  }
}

export default new AppModuleLoader()

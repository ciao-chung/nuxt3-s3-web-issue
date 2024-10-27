import {defineStore} from 'pinia'
import projectConfig from '@/project'
import type {ApplicationInterface} from '@/types/application'
import type {AnyObject} from '@/types/base'

declare interface StateInterface {
  sidebarStatus: boolean
  layoutName: string
  layoutReady: boolean
  application: ApplicationInterface|null
  applicationLoadFail: boolean
  breadcrumbScope: string
  breadcrumb: AnyObject[]
  navigationExtension: {
    meta: any
    component: null|any
  }
  deviceWidth: number
  deviceHeight: number
  isNavFixTop: boolean
  mobileNavActive: boolean
  isMobile: boolean
}

export const useAppStore = defineStore('app', {
  state: (): StateInterface => ({
    sidebarStatus: true,
    layoutName: 'undefined',
    layoutReady: false,
    application: null,
    applicationLoadFail: false,
    breadcrumbScope: 'default',
    breadcrumb: [],
    navigationExtension: {
      meta: null,
      component: null
    },
    deviceWidth: 0,
    deviceHeight: 0,
    isNavFixTop: false,
    mobileNavActive: false,
    isMobile: false,
  }),
  actions: {
    setSidebarStatus(status: boolean) {
      this.sidebarStatus = status
    },
    setBreadcrumb(data: AnyObject[]) {
      this.breadcrumb = data
    },
    setBreadcrumbScope(data: string) {
      this.breadcrumbScope = data
    },
    setNavigationExtension(component: any, meta?: any) {
      this.navigationExtension.component = component
      this.navigationExtension.meta = meta ?? null
    },
    setDeviceSize(width: number, height: number) {
      this.deviceWidth = width
      this.deviceHeight = height
    }
  },
  getters: {
    projectConfig(state) {
      return projectConfig
    },
  },
})

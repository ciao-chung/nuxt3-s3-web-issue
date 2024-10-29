import type {ComponentPublicInstance as VueInstance} from 'vue'
import type {RouteRecordRaw, RouteLocationRaw} from 'vue-router'
import type {ApiRequestInterface} from 'core/libs/api/apiRequest'
import type {HasRoleInterface} from 'core/libs/token/token.type'
import type {TokenHandlerInterface} from '~/src/core/libs/token/tokenHandler'
import { ListConfigInterface } from '@/components/list/types/listConfig'

export interface MenuCreateOptionInterface {
  hasRole: HasRoleInterface
  tokenStore: TokenHandlerInterface
}

interface EagleSidebarItemBaseType {
  label: string
  icon?: string
  target?: '_blank'|'_self'
  route?: RouteLocationRaw
  create?: (options: MenuCreateOptionInterface) => boolean
  shouldCreate: boolean // for internal use
}

export interface EagleSidebarItem extends EagleSidebarItemBaseType{
  group?: EagleSidebarItemBaseType[]
}

export type FormModeType = 'create'|'update'

export interface FormInfoInterface {
  formConfig: AnyObject|null
  formMeta: AnyObject|null
  formData: AnyObject
  formMode: FormModeType
  hasWritePermission: boolean
}

export interface FormDataChangeHelperInterface {
  formMode: FormModeType
  formMeta: AnyObject|null|undefined
  formConfig: AnyObject|null|undefined
  formData: AnyObject|null|undefined
  data: any
  originalData: any
  bothEmpty: (value1: any, value2: any) => boolean
  arrayPropertyDiff: (array1: any, array2: any, property: Function|string|string[]) => boolean
  photoListEqual: (photos1: any, photos2: any) => boolean
}

export interface ListInfoInterface {
  listConfig: ListConfigInterface
  listData: AnyObject
  listMeta: AnyObject
}

export type EagleModuleSidebar = {
  public: EagleSidebarItem[]
  nonLogin: EagleSidebarItem[]
  member: EagleSidebarItem[]
}

export type EagleModuleRoute = {
  public: RouteRecordRaw[]
  nonLogin: RouteRecordRaw[]
  member: RouteRecordRaw[]
}

export type EagleModuleApi = (apiRequest: ApiRequestInterface) => void

export type EagleModule = {
  launch(): Promise<void>
  routes: EagleModuleRoute,
  sidebar: EagleModuleSidebar,
  api: EagleModuleApi,
}

export interface ModuleConfigInterface {
  launch(): Promise<void>
  get(): EagleModule
}

export type {
  VueInstance,
}

export type AnyObject = {
  [key: string]: any
}

export type EmptyObject = Record<string, any>

export type I18nConfigType = {
  [key: string]: string
}

export type I18nFunction = (i18n: string) => any

export type SortType = 'asc'|'desc'

export type GridConfig = {
  xxl?: number,
  xl?: number,
  lg?: number,
  md?: number,
  sm?: number,
  xs?: number,
  xxs?: number,
}

export interface FileModel {
  id: string
  path: string
  filename: string
  type: string
  extra_file_base_url: string|null
  size: number
}

export interface PhotoObject {
  name: string
  source_name: string
  category: string
  size_list: AnyObject
  uid: string
  url: string|null
}
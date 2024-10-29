declare interface BaseStorageInterface {
  init() : void
  all() : {[key: string]: any}
  get(property: string, jsonFormat?: boolean) : any
  set(property: string, value: any) : void
  delete(property: string) : void
}

export type {
  BaseStorageInterface
}
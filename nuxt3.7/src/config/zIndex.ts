const step = 100
const baseZIndex = {
  /**
   * cms/src/assets/sass/base.sass的eagle-header
   */
  header: 180,

  /**
   * cms/src/assets/sass/base.sass的v-dialog__content
   */
  dialog: 2000,

  /**
   * cms/src/components/loading/loading.vue
   * cms/src/components/loading/progressLoading.vue
   */
  loading: 9999999999,
}

declare type zIndexConfig = {
  header: number,
  dialog: number,
  loading: number,
  sidebar: number,

  listCardMode: number,
  listInfo: number,
  listFilter: number,
  listTable: number,
  formAction: number,
  htmlEditorLoading: number,
  htmlEditorFullScreen: number,
}

export type zIndexConfigType = zIndexConfig

export default <zIndexConfig>{
  header: baseZIndex.header,
  dialog: baseZIndex.dialog,
  loading: baseZIndex.loading,
  sidebar: baseZIndex.header+10,

  // list
  listCardMode: 10,
  listInfo: 100,
  listFilter: 100,
  listTable: 110,

  // form
  formAction: baseZIndex.header+10,

  // htmlEditor
  htmlEditorLoading: 2,
  htmlEditorFullScreen: baseZIndex.header+(step*15), // cms/src/assets/sass/base.sass的.tox-fullscreen.tox.tox-tinymce.tox-fullscreen
}

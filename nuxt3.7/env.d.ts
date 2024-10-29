/// <reference types="vite/client" />
interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_LOCALE?: string
  readonly VITE_WEB_HOST?: string
  readonly VITE_WEB_HOST_WITH_BASE_URL?: string
  readonly VITE_STATIC_APPLICATION_API?: any
  readonly VITE_BASEURL?: string
  readonly VITE_GTAG_ID?: string
  readonly VITE_GTAG_ENABLED?: boolean
}
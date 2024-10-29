import type { NuxtConfig } from '@nuxt/schema'

export default (baseURL: string) => <NuxtConfig['nitro']>{
  compressPublicAssets: true,
  prerender: {
    crawlLinks: true,
    ignore: [
      '/404',
      '/member/404',
    ],
  },
}
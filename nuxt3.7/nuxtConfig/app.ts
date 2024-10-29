import type { NuxtConfig } from '@nuxt/schema'

export default (baseURL: string) => <NuxtConfig['app']>{
  baseURL: baseURL,
  head: {
    htmlAttrs: {
      lang: 'zh-Hant',
    },
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap',
        crossorigin: 'anonymous',
      },
      {
        rel: 'shortcut icon',
        href: `${baseURL}favicon.ico`,
      }
    ],
  }
}
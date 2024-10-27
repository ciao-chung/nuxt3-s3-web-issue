import type { NuxtConfig } from '@nuxt/schema'
import projectConfig from '../src/project'

/* ref: https://vite-pwa-org.netlify.app/frameworks/nuxt
* 快取策略: https://developer.chrome.com/docs/workbox/caching-strategies-overview?hl=zh-tw#network_first_falling_back_to_cache
*/
export default (baseURL: string) => <NuxtConfig['pwa']> {
  registerType: 'autoUpdate',
  base: baseURL,
  scope: '/',
  workbox: {
    // ref: https://developer.chrome.com/docs/workbox/modules/workbox-build?hl=zh-tw#property-GlobPartial-globPatterns
    globPatterns: ['**/*.{js,css,png,jpg,jpeg,svg}'],

    // ref: https://developer.chrome.com/docs/workbox/modules/workbox-build?hl=zh-tw#type-RuntimeCaching
    runtimeCaching: [
      {
        // 對於所有的請求都使用 NetworkOnly 策略
        urlPattern: ({ request }) => true,
        handler: 'NetworkOnly',
      },

      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 30, // 快取最多 30 個 Google Fonts 資源
            maxAgeSeconds: 60 * 60 * 24 * 365, // 快取一年
          },
          cacheableResponse: {
            statuses: [0, 200], // 快取成功響應的資源
          },
        },
      },
    ],
  },
  manifest: {
    start_url: '/',
    lang: 'zh-TW',
    name: projectConfig.appName,
    short_name: projectConfig.appName,
    theme_color: projectConfig.primaryColor,
    background_color: projectConfig.pwaManifestBackgroundColor,
    icons: [
      {
        src: './images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}
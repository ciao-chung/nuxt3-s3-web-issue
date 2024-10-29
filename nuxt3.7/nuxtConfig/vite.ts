import type { NuxtConfig } from '@nuxt/schema'
import { transformAssetUrls } from 'vite-plugin-vuetify'

export default <NuxtConfig['vite']>{
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vuetify': ['vuetify'],
          'lodash': ['lodash'],
        },
      },
    }
  },

  vue: {
    template: {
      transformAssetUrls,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
      sass: {
        api: 'modern-compiler',
      },
    },
  },
}
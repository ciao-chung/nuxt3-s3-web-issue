import {fileURLToPath, URL} from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

// nuxt config
import app from './nuxtConfig/app'
import vite from './nuxtConfig/vite'
import nitro from './nuxtConfig/nitro'
import css from './nuxtConfig/css'
import pwa from './nuxtConfig/pwa'
import gtag from './nuxtConfig/gtag'
import site from './nuxtConfig/site'
import sitemap from './nuxtConfig/sitemap'

const baseURL = import.meta.env.VITE_BASEURL as string
console.log('baseURL', baseURL)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  app: app(baseURL),
  
  nitro: nitro(baseURL),
  
  css: css,
  
  devtools: {
    enabled: false,
  },
  
  devServer: {
    port: 8888,
  },
  
  build: {
    transpile: [
      'vuetify',
      // ref: https://github.com/nuxt/nuxt/issues/22185
      (ctx: any) => ctx.isServer ? 'lodash' : '',
    ],
  },

  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    'modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
    'core': fileURLToPath(new URL('./src/core', import.meta.url)),
    'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
  },
  
  vite: vite,
  
  pwa: pwa(baseURL),
  
  gtag: gtag,

  site: site(baseURL),
  sitemap: sitemap(baseURL),

  modules: [
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true,
        }))
      })
    },
  ],
})
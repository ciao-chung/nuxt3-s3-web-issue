import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['gtag']>{
  enabled: process.env.NODE_ENV === 'production',
  id: import.meta.env.VITE_GTAG_ID,
}
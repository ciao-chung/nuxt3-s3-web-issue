import type { NuxtConfig } from '@nuxt/schema'
import projectConfig from '../src/project'

// https://nuxtseo.com/sitemap/getting-started/installation
export default (baseURL: string) => <NuxtConfig['site']>{
  url: import.meta.env.VITE_WEB_HOST,
  name: projectConfig.appName,
}
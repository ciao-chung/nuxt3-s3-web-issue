import type { NuxtConfig } from '@nuxt/schema'

// https://nuxtseo.com/sitemap/guides/filtering-urls#filter-urls-with-include-exclude
export default (baseURL: string) : NuxtConfig['sitemap'] => {
  const sitemap = {
    include: [
      baseURL,
      `${baseURL}**`,
    ],
    exclude: [
      `${baseURL}debug`,
    ],
  }
  if (baseURL != '/') {
    sitemap.exclude.push(`${baseURL.slice(0, -1)}${baseURL.slice(0, -1)}`)
  }
  return sitemap
}
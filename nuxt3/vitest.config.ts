import {fileURLToPath, URL} from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url))
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      'core': fileURLToPath(new URL('./src/core', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
})

// plugins/vuetify.js
import '@/assets/scss/main.scss'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'
import { aliases, fa } from 'vuetify/iconsets/fa'

const customColor = {
  'brand-google': '#DD4B39',
  'brand-facebook': '#3965DD',
  'brand-line': '#06c152',
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.blue.base,
            accent: colors.blue.lighten2,
            info: colors.blue.base,
            warning: colors.amber.base,
            error: colors.red.lighten1,
            success: colors.green.lighten1,
            ...customColor,
          }
        },
      }
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
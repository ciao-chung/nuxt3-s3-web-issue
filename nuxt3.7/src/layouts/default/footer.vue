<template>
  <v-footer
    eagle="footer"
    class="py-4 text-white text-center d-flex flex-column">
    <div class="px-4 py-2 w-100">
      Copyright © {{ year }} {{ appName }}
    </div>

    <div class="px-4 py-2 w-100">
      v{{ version }}
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import projectConfig from '@/project'
import {version} from '@/../package.json'
const startYear = computed(() => projectConfig.startYear)
const thisYear = new Date().getFullYear()
const year = computed(() => {
  if (startYear.value === thisYear) {
    return thisYear
  }
  return `${startYear.value} - ${thisYear}`
})
const appName = computed(() => projectConfig.appName)
</script>

<style lang="sass" scoped>
@use 'assets/sass/variable.sass' as * 
*[eagle="footer"]
  background-color: $app-color-background

</style>
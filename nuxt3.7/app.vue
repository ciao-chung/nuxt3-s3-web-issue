<template>
  <v-app>
    <h1>Nuxt3 Demo</h1>
  </v-app>
</template>

<script setup lang="ts">
import projectConfig from '@/project'
import homeBanner from '~/assets/images/banner.webp'
const host = import.meta.env.VITE_WEB_HOST_WITH_BASE_URL
const ogImage = `${host}${homeBanner}`

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${projectConfig.title}` : projectConfig.title;
  },
  keywords: projectConfig.keywords,
  ogType: 'website',
  ogUrl: host,
  ogImage: ogImage,
  ogTitle: projectConfig.title,
  description: projectConfig.description,
  ogDescription: projectConfig.description,
})
</script>

<style lang="sass">
@use 'assets/sass/base.sass'
@use 'vuetify/lib/styles/main.sass'
</style>
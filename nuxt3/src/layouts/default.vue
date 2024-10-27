<template>
  <v-layout
    :eagle-layout="layoutName"
    class="fill-height"
  >
    <navigation></navigation>
    <v-main
      v-if="application"
      :style="vMainStyle"
    >
      <breadcrumb scope="default"></breadcrumb>
      <div class="container">
        <div v-if="!errorMode">
          <RouterView />
        </div>

        <v-card v-if="errorMode">
          <v-card-text>
            <slot name="error"></slot>
          </v-card-text>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
const appStore = useAppStore()

// components

// layout
const layoutName = ref('default')
import { useLayout } from '@/composables/layout'

const {
  navigation,
} = useLayout()


// props
defineProps({
  errorMode: {
    type: Boolean,
    default: false,
  },
})

// router & route
const router = useRouter()
const route = useRoute()

// computed
const vMainStyle = computed(() => {
  const layoutTop = mutantNav.value ? 0 : '48px'
  return {
    '--v-layout-left': '0px',
    '--v-layout-right': '0px',
    '--v-layout-top': layoutTop,
    '--v-layout-bottom': '0px',
  }
})

const mutantNav = computed<boolean>(() => {
  if (appStore.applicationLoadFail) {
    return false
  }

  return route.meta.mutantNav === true
})
</script>

<style lang="sass" scoped></style>
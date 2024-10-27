import {watch, ref} from 'vue'
import {useDisplay} from 'vuetify'
import {helper} from 'core/core'
import { useAppStore } from '@/store/app'

const getDevice = (xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean, xxl: boolean) => {
  if (xs) return 'xs'
  if (sm) return 'sm'
  if (md) return 'md'
  if (lg) return 'lg'
  if (xl) return 'xl'
  if (xxl) return 'xxl'
  return 'lg'
}

export function useDetectAppDevice() {
  const vuetifyDisplay = ref(useDisplay())
  const appStore = useAppStore()
  const updateHelperDevice = () => {
    const {mdAndDown, xs, sm, md, lg, xl, xxl} = vuetifyDisplay.value
    // const isMobile = mdAndDown
    const { isMobile } = useDevice()
    const device = getDevice(xs, sm, md, lg, xl, xxl)
    helper.setupDevice(device, isMobile)
    appStore.$patch({
      isMobile: isMobile
    })
  }

  watch(vuetifyDisplay, () => {
    updateHelperDevice()
  }, {
    immediate: true,
    deep: true,
  })
}

export function useIsMobile() : boolean {
  const {smAndDown} = useDisplay()
  return smAndDown.value
}

export function useGetDevice() : string {
  const {xs, sm, md, lg, xl, xxl} = useDisplay()
  return getDevice(xs.value, sm.value, md.value, lg.value, xl.value, xxl.value)
}
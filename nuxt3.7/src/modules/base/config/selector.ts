import moduleSelector from 'core/libs/moduleSelector'
import type {ModuleSelectorConfigInterface} from 'core/libs/moduleSelector'
import {defineAsyncComponent} from 'vue'
import {i18n} from '~/plugins/i18n'
const t = i18n.global.t 

export function fileSelector(config: ModuleSelectorConfigInterface) {
  moduleSelector.active({
    title: t('module.file'),
    bodySlot: defineAsyncComponent(() => import('modules/base/selector/fileListSelector.vue')),
    ...config,
  })
}

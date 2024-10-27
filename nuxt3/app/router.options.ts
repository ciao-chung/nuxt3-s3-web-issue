import type { RouterConfig } from '@nuxt/schema'
import {appModuleLoader} from '@/app/appInit'
appModuleLoader.init()
const moduleRoutes = appModuleLoader.getRoutes()

// ref: https://nuxt.com/docs/guide/going-further/custom-routing
export default <RouterConfig> {
  routes: (_routes) => [
    {
      path: '/',
      component: () => import('@/layouts/default.vue'),
      meta: { layout: 'default' },
      children: [
        ...moduleRoutes.public,
        {
          path: '404',
          name: '404',
          component: () => import('@/pages/404.vue'),
        },
      ],
    },
  ],
}

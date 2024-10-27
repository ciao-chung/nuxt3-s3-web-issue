import type {EagleModuleRoute} from '@/types/base'

export default <EagleModuleRoute> {
  public: [
    {
      path: '/',
      name: 'home',
      meta: {
        mutantNav: true,
      },
      component: () => import('@/modules/base/views/home.vue')
    },
  ],
  nonLogin: [],
  member: [],
}

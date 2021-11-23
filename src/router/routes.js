import { defineRoutes } from '@/utils/router-util';

const routes = defineRoutes([
  {
      path: '/',
      name: 'home',
      title: '首页',
      component: () => import('@/components/home.vue'), //.vue不能省略

  }
])
export default routes;

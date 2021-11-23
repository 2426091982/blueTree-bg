const routes = [
  {
      path: '/',
      name: 'home',
      title: '首页',
      component: () => import('@/components/home.vue'), //.vue不能省略
  }
]
export default routes

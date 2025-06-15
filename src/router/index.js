import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
// 使用懒加载导入演示组件
const LazyLoadingDemo = () => import('../components/LazyLoadingDemo.vue')

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/lazy-demo',
      name: 'lazy-demo',
      component: LazyLoadingDemo,
      meta: {
        title: '懒加载演示'
      }
    },
  ],
})
// 
export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calcular',
    name: 'calcular',
    component: () => import('../views/CalcularView.vue')
  },
  {
    path: '/observando',
    name: 'observando',
    component: () => import('../views/ObservarView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

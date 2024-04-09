import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GroupMembers from '../views/GroupMembers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/groupmembers',
      name: 'groupmembers',
      component: GroupMembers
    }
  ]
})

export default router

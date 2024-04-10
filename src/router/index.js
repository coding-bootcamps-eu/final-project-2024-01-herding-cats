import { createRouter, createWebHistory } from 'vue-router'

import GroupMembers from '@/views/GroupMembers.vue'
import TripOverview from '@/views/TripOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/groupmembers',
      name: 'groupmembers',
      component: GroupMembers
    },
    {
      path: '/trip',
      name: 'Trip',
      component: TripOverview
    }
  ]

})

export default router

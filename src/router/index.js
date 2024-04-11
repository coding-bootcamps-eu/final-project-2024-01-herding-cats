import { createRouter, createWebHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import GroupMembers from '@/views/GroupMembers.vue'
import ProfilView from '@/views/ProfilView.vue'
import TripOverview from '@/views/TripOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/notes',
      name: 'notes',
      component: NotesView
    },
    {
      path: '/groupmembers',
      name: 'groupmembers',
      component: GroupMembers
    },
    {
      path: '/groupmembers/:id',
      name: 'profile',
      component: ProfilView
    },
    {
      path: '/trip',
      name: 'Trip',
      component: TripOverview
    }
  ]
})

export default router

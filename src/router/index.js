import { createRouter, createWebHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import GroupMembers from '@/views/GroupMembers.vue'
import TripOverview from '@/views/TripOverview.vue'
import StartPage from '@/views/StartPage.vue'
import TransportView from '@/views/TransportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartPage
    },
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
      path: '/trip',
      name: 'newTrip',
      component: TripOverview
    },
    {
      path: '/trip/:id',
      name: 'trip',
      component: TripOverview
    },
    {
      path: '/transport',
      name: 'Transport',
      component: TransportView
    }
  ]
})

export default router

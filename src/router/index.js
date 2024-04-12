import { createRouter, createWebHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import GroupMembers from '@/views/GroupMembers.vue'
import ProfilView from '@/views/ProfilView.vue'
import TripOverview from '@/views/TripOverview.vue'
import StartPage from '@/views/StartPage.vue'
import TransportView from '@/views/TransportView.vue'
import ActivityView from '@/views/ActivityView.vue'
import LodgingView from '@/views/LodgingView.vue'

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
      path: '/groupmembers/:id',
      name: 'profile',
      component: ProfilView
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
    },
    {
      path: '/activity',
      name: 'Activity',
      component: ActivityView
    },
    {
      path: '/lodging',
      name: 'Lodging',
      component: LodgingView
    }
  ]
})

export default router

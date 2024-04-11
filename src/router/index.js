import { createRouter, createWebHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import GroupMembers from '@/views/GroupMembers.vue'
import TripOverview from '@/views/TripOverview.vue'
import TimeLine from '@/views/TimeLine.vue'

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
      path: '/trip',
      name: 'Trip',
      component: TripOverview
    },
    {
      path: '/TimeLine',
      name: 'timeline',
      component: TimeLine
    }
  ]
})

export default router

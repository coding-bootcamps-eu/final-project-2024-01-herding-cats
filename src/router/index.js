import { createRouter, createWebHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import GroupMembers from '@/views/GroupMembers.vue'
import ProfilView from '@/views/ProfilView.vue'
import TripOverview from '@/views/TripOverview.vue'
import TimeLine from '@/views/TimeLine.vue'
import StartPage from '@/views/StartPage.vue'
import TransportView from '@/views/TransportView.vue'
import ActivityView from '@/views/ActivityView.vue'
import LodgingView from '@/views/LodgingView.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'
import LogOut from '@/views/LogOut.vue'
import AllTravels from '@/views/AllTravels.vue'
import NewTrip from '@/views/NewTrip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartPage
    },
    {
      path: '/TripOverview',
      name: 'tripoverview',
      component: TripOverview
    },
    {
      path: '/NewTrip',
      name: 'newtrip',
      component: NewTrip
    },
    {
      path: '/LogIn',
      name: 'login',
      component: LogIn
    },
    {
      path: '/SignUp',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/LogOut',
      name: 'logout',
      component: LogOut
    },
    {
      path: '/AllTravels',
      name: 'alltravels',
      component: AllTravels
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
      path: '/TimeLine',
      name: 'timeline',
      component: TimeLine
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

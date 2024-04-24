<template>
  <div class="container">
    <h2>Your trips</h2>

    <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
        </ul>
      </div>
    </transition> -->

    <div id="app">
      <div class="wrap">
        <ejs-calendar
          id="calendar"
          ref="CalendarInstance"
          :isMultiSelection="isMultiSelection"
          :values="values2"
        ></ejs-calendar>
      </div>
    </div>

    <div class="calendar-list">
      <h4>List of your trips</h4>
      <ul>
        <li v-for="trip in sortedEvents" :key="trip.id">
          <router-link :to="`/trip/${trip.id}`">
            {{ trip.tripTitle }} <br />
            {{ trip.tripStart.split(' ')[0] }} -
            {{ trip.tripEnd.split(' ')[0] }}
          </router-link>

          <span @click="favoriteStatus">
            {{ favStat ? '\ud83d\udda4' : '\u2665\ufe0f' }}
          </span>
        </li>
      </ul>
    </div>

    <searchPublicTrips />
    <router-link :to="'/NewTrip'"><button>Create new trip</button></router-link>
    <router-link :to="{ name: 'personalnotes' }"><button>Personal notes</button></router-link>
    <LogoutButton />
  </div>
</template>

<script setup>
// import Vue from 'vue'
import { CalendarComponent as EjsCalendar } from '@syncfusion/ej2-vue-calendars'
// import { CalendarPlugin } from '@syncfusion/ej2-vue-calendars'
// Vue.use(CalendarPlugin)
</script>

<script>
import searchPublicTrips from '@/components/searchPublicTrips.vue'
import { herdingCatsstore } from '@/stores/counter.js'
import LogoutButton from '@/components/LogoutButton.vue'

export default {
  data() {
    return {
      showSidebar: false,
      favStat: false,
      isMultiSelection: true,
      state: herdingCatsstore(),
      values: [new Date('1/1/2020'), new Date('1/15/2020')],
      values2: []
    }
  },
  components: {
    LogoutButton,
    searchPublicTrips
  },
  computed: {
    sortedEvents() {
      return this.state.userTrips.slice().sort((a, b) => {
        const [dayA, monthA, yearA, timeA] = a.tripStart.split(/[.\s-]+/)
        const [dayB, monthB, yearB, timeB] = b.tripStart.split(/[.\s-]+/)

        const dateA = new Date(`${yearA}-${monthA}-${dayA}T${timeA}`)
        const dateB = new Date(`${yearB}-${monthB}-${dayB}T${timeB}`)

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          console.error('Invalid date format:', a.startDate, b.startDate)
          return 0
        }

        return dateA - dateB
      })
    }
  },
  methods: {
    /*     hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 2000)
    }, */
    favoriteStatus() {
      this.favStat = !this.favStat
    },
    formatChange() {
      const eventStart = this.state.userTrips.map((trip) => trip.tripStart)
      this.values2 = eventStart.flatMap((dateString) => {
        const parts = dateString.split(' - ')
        const datePart = parts[0].split('.').reverse().join('-')
        const timePart = parts[1]
        const fullDate = new Date(`${datePart}T${timePart}`)
        return fullDate
      })
    },

    async checkUser() {
      if (this.state.user === null || Object.keys(this.state.user).length === 0) {
        alert('No user logged in. No data to show. Sorry mate.')
      } else {
        await this.state.loadUserTripData()
        this.formatChange()
      }
    }
  },
  async created() {
    await this.checkUser()
  }
}
</script>

<style scoped>
.hamburger-menu {
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 3px;
  margin-top: 5px;
  background-color: #000;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-left: 5px;
}

h4 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
}

.slide-enter-active {
  transition: transform 0.3s;
}

.slide-leave-active {
  transition: transform 1s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-200px);
}

.wrap {
  margin: 10px auto;
  max-width: 250px;
}

.calendar-list {
  text-align: center;
}

ul li {
  list-style-position: inside;
  list-style-type: circle;
  font-size: 15px;
  margin-bottom: 10px;
}

span {
  padding-left: 5px;
  cursor: pointer;
}
</style>

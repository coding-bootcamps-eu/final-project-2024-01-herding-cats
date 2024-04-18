<template>
  <div class="container">
    <h2>Your trips</h2>

    <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
        </ul>
      </div>
    </transition>

    <div id="app">
      <div class="wrap">
        <ejs-calendar
          id="calendar"
          ref="CalendarInstance"
          :isMultiSelection="isMultiSelection"
          :values="values"
        ></ejs-calendar>
      </div>
    </div>

    <div class="calendar-list">
      <h4>List of your trips</h4>
      <ul>
        <router-link
          v-for="trip in state.tripData"
          :key="trip.tripTitle"
          :to="{ path: '/trip/' + trip.tripTitle.toLowerCase() }"
        >
          <li>
            {{ trip.tripTitle }}: {{ trip.tripStart.split(' ')[0] }} -
            {{ trip.tripEnd.split(' ')[0] }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="search">
      <form>
        <label for="fname">List public trips you like</label>
        <input
          type="text"
          class="icon"
          value
          placeholder="Search trips to join"
          id="fname"
          name="fname"
          @keyup="searchPublicTrip"
        />
      </form>

      <div class="publictrips-list">
        <ul>
          <router-link
            v-for="trip in state.tripData"
            :key="trip.tripTitle"
            :to="{ path: '/trip/' + trip.tripTitle.toLowerCase() }"
          >
            <li v-for="trip in filteredPublicTrips" :key="trip.tripTitle">
              {{ trip.tripTitle }}
            </li>
          </router-link>
        </ul>
      </div>
    </div>
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
import { herdingCatsstore } from '@/stores/counter.js'
import LogoutButton from '@/components/LogoutButton.vue'
export default {
  data() {
    return {
      showSidebar: false,
      isMultiSelection: true,
      values: [],
      state: herdingCatsstore(),
      values2: [
        new Date('1/1/2020'),
        new Date('1/15/2020'),
        new Date('1/3/2020'),
        new Date('1/25/2020')
      ]
    }
  },
  components: {
    LogoutButton
  },

  methods: {
    hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 2000)
    },
    formatChange() {
      this.state.tripData.forEach((trip) => {
        const date = trip.tripStart.split('.')
        const day = date[0]
        const month = date[1]
        const year = date[2]

        const dateChanged = `${month}/${day}/${year}`

        this.values.push(new Date(dateChanged))
      })
    }
    // searchPublicTrip(event) {
    //   const suchbegriff = event.target.value.toLowerCase()
    // }
  },
  mounted() {
    this.formatChange()
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

form label {
  font-size: 18px;
  margin-bottom: 5px;
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

.icon {
  padding-left: 25px;
  background: url('https://static.thenounproject.com/png/101791-200.png') no-repeat left;
  background-size: 20px;
  margin: 0.7rem auto;
}

form {
  margin-top: 3rem;
  font-weight: bold;
}
</style>

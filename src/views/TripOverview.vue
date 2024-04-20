<template>
  <header>
    <img src="../assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />

    <!--     <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div> -->
  </header>

  <main>
    <section class="container overview">
      <h3>{{ state.tripData[0].tripTitle }}</h3>
      <p v-if="Object.keys(state.tripData[0].details).length === 0" class="initial-text">
        Click "Add Item" to start Herding your Cats
      </p>
      <ul class="list">
        <li
          class="list-item"
          v-for="(key, index) in Object.keys(state.tripData[0].details)"
          :key="index"
        >
          <router-link :to="`/${key}/${this.tripId}`">
            <p>{{ key }} ></p>
          </router-link>
        </li>
      </ul>
    </section>

    <ToggleSwitch class="switch" labelText="This trip is Public" />

    <!--     <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
        </ul>
      </div>
    </transition> -->

    <button @click="openOptions">Add Item</button>
    <dialog class="add-options" ref="add-options">
      <form method="dialog" action="">
        <a href="">Transport</a>
        <a href="">Lodging</a>
        <a href="">Activity</a>
        <a href="">Group Members</a>
        <a href="">Packing List</a>
        <a href="">Notes</a>
        <br />
        <button>Cancel</button>
      </form>
    </dialog>
    <router-link to="/timeline">
      <button class="timeline">View Timeline</button>
    </router-link>
    <section>
      <p class="white-box-id">Trip ID: {{ tripId }}</p>
      <button @click="copyId">Copy ID</button>
    </section>
  </main>
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      state: herdingCatsstore(),
      tripId: '',
      showSidebar: false
    }
  },
  components: {
    ToggleSwitch
  },
  methods: {
    openOptions() {
      this.$refs['add-options'].showModal()
    },
    async copyId() {
      await navigator.clipboard.writeText(this.tripId)
    },

    async checkTripId() {
      if (this.tripId === undefined) {
        await this.createTrip()
      } else {
        await this.state.loadTripData(this.tripId)
      }
    },

    async createTrip() {
      console.log('createTrip initiated')
      ;(this.state.tripData = {
        id: '',
        admins: [],
        tripTitle: 'Add a Title',
        tripStart: '',
        tripEnd: '',
        public: false,
        details: []
      }),
        await fetch(this.state.apiUrl + 'events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.tripData)
        })
    },

    hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 2000)
    }
  },
  created() {
    this.tripId = this.$route.params.id
    console.log('Routed tripId: ' + this.tripId)
    this.checkTripId()
  }
}
</script>

<style scoped>
button {
  width: 32rem;
}
header {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
}
.list {
  margin-top: 2rem;
}

.detail-btn {
  width: 10rem;
}
.white-box-id {
  padding: 1rem;
  color: black;
  background-color: white;
  margin-bottom: 0;
  font-size: 1.5rem;
}

.container {
  background-color: var(--turqoise-gray-background);
}
.overview {
  color: black;
  min-height: 10rem;
  background-color: var(--gray-accomodation);
}
.timeline {
  color: black;
  background-color: var(--pink-background);
}
.switch {
  margin: 5rem 0px;
}

.add-options form {
  display: flex;
  flex-direction: column;
}

.hamburger-menu {
  margin-top: 5rem;
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
</style>

<template>
  <header>
    <h2>{{ tripData.eventTitle }}</h2>

    <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </header>

  <main>
    <section class="container overview">
      <p v-if="tripDetails.length < 1" class="initial-text">
        Click "Add Item" to start Herding your Cats
      </p>
      <ul class="list">
        <h3>Overview</h3>
        <li v-for="detail in tripDetails" :key="detail.category">
          <p>{{ detail.category }}</p>
          <button class="detail-btn">Details</button>
        </li>
      </ul>
    </section>
    <button class="timeline">Timeline</button>
    <ToggleSwitch class="switch" labelText="This trip is Public" />

    <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
        </ul>
      </div>
    </transition>

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
    <section class="copy-trip-id">
      <p class="white-box-id">Trip ID: {{ tripId }}</p>
      <button class="btn-copy-id" @click="copyId">Copy ID</button>
    </section>
  </main>
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      newDetails: '',
      tripData: [],
      tripId: '',
      tripDetails: [],
      disableBtn: true,
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
    async loadData() {
      const response = await fetch(`${this.tripApiUrl}/${this.tripId}`)
      const apiData = await response.json()
      this.tripData = apiData
      if (this.tripId === this.tripData.id) {
        console.log('tripId test passed')
      } else {
        alert("Looks like you put in a Trip ID that doesn't exist")
      }
      this.tripDetails = this.tripData.details
      return this.tripDetails
    },

    checkTripId() {
      if (this.tripId === undefined) {
        this.createTrip()
      } else {
        this.loadData()
      }
    },

    async createTrip() {
      console.log('createTrip initiated')
      ;(this.tripData = {
        id: '',
        userId: '',
        eventTitle: 'Trip Title',
        eventDescription: 'Add a short desciption (Optional)',
        public: false,
        details: []
      }),
        await fetch(this.tripApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.tripData)
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
.list {
  margin-top: 2rem;
}

.detail-btn {
  width: 10rem;
}
.copy-trip-id {
  position: relative;
  background-color: white;
  display: flex;
  align-items: baseline;
  width: 28rem;
  height: 4rem;
}
.btn-copy-id {
  position: relative;
  width: 10rem;
  height: 3.6rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
}
.white-box-id {
  color: black;
  position: absolute;
  background-color: white;
  margin-left: 1rem;
  margin-top: 1rem;
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
  background-color: var(--yellow-calendar);
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

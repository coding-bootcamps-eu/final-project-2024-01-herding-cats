<template>
  <h2>{{ trip.eventTitle }}</h2>
  <div class="container">
    <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <ToggleSwitch class="switch" labelText="This trip is Public" />
    <section class="overview">
      <p v-if="tripDetails.length < 1" class="initial-text">
        Click "Add Item" to start Herding your Cats
      </p>
      <ul></ul>
      <li v-for="detail in tripDetails" :key="detail.category + Math.floor(Math.random() * 10000)">
        {{ detail.category }}
      </li>
    </section>

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
    <section id="trip-id">
      <p>Trip ID:{{ trip.id }}</p>
      <button @click="copyId">Copy ID to Clipboard</button>
    </section>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
export default {
  data() {
    return {
      trip: {},
      tripDetails: {},
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
      await navigator.clipboard.writeText(this.trip.id)
    },
    async loadData() {
      const response = await fetch(
        'http://localhost:3000/events/7220e93a-804f-4c9e-880a-8e53e429c1b3'
      )
      const data = await response.json()
      this.trip = data
      this.tripDetails = data.details
    },
    hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 2000)
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
#trip-id {
  margin-top: 5px;
}
.overview {
  margin: 5rem 0rem;
  min-height: 10rem;
  background-color: blanchedalmond;
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

<template>
  <header>
    <img src="@/assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />

    <!--     <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div> -->
  </header>

  <main>
    <section class="container overview">
      <h3>
        {{
          state.tripData[0].tripTitle.charAt(0).toUpperCase() + state.tripData[0].tripTitle.slice(1)
        }}
      </h3>
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
            <img class="arrow" src="@/assets/arrow.svg" alt="Arrow symbol" />
            <p>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</p>
          </router-link>
        </li>
      </ul>
    </section>

    <!--     <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
        </ul>
      </div>
    </transition> -->
    <nav>
      <button v-if="isUserThere" @click="openOptions">Add Item</button>
      <dialog class="add-options" ref="add-options">
        <form method="dialog" action="">
          <router-link :to="{ path: '/transport/' + this.$route.params.id }"
            ><button>Transport</button></router-link
          >
          <router-link :to="{ path: '/lodging/' + this.$route.params.id }"
            ><button>Lodging</button></router-link
          >
          <router-link :to="{ path: '/activity/' + this.$route.params.id }"
            ><button>Activity</button></router-link
          >
          <router-link :to="{ path: '/groupmembers/' + this.$route.params.id }"
            ><button>Group Members</button></router-link
          >
          <router-link :to="{ path: '/packlist/' + this.$route.params.id }"
            ><button>Packing List</button></router-link
          >
          <router-link :to="{ path: '/notes/' + this.$route.params.id }"
            ><button>Notes</button></router-link
          >
          <button class="cancel-btn">Cancel</button>
        </form>
      </dialog>
      <router-link :to="{ path: '/timeline/' + this.$route.params.id }">
        <button class="timeline">Trip Timeline</button>
      </router-link>
      <ToggleSwitch v-if="isUserThere" class="toggle-switch" labelText="This trip is Public" />
      <p class="white-box-id">Trip ID: {{ tripId }}</p>
      <button @click="copyId">Copy ID</button>
      <router-link :to="{ name: 'alltravels' }">
        <button v-if="isUserThere">Back to all your trips</button></router-link
      >
      <router-link :to="{ name: 'home' }"> <button v-if="!isUserThere">Back</button></router-link>
      <button v-if="isUserThere" class="delete-trip" @click="deleteTrip">Delete Trip</button>
    </nav>
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
      showSidebar: false,
      isUserThere: false
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

    async checkUser() {
      console.log(this.state.user)
      if (this.state.user === null || Object.keys(this.state.user).length === 0) {
        this.isUserThere = false
      } else {
        this.isUserThere = true
      }
    },

    async checkTripId() {
      if (this.tripId === undefined) {
        await this.state.createTrip()
      } else {
        await this.state.loadTripData(this.tripId)
      }
    }

    /*  hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 2000)
    } */
  },
  created() {
    this.tripId = this.$route.params.id
    console.log('Routed tripId: ' + this.tripId)
    this.checkTripId()
    this.checkUser()
  }
}
</script>

<style scoped>
.list {
  position: relative;
  margin-top: 2rem;
  width: 28rem;
}
.list-item {
  position: relative;
}
.arrow {
  z-index: 1;
  position: absolute;
  margin-left: 25rem;
  margin-top: 2.2rem;
}

.cancel-btn {
  margin-top: 2rem;
}

button {
  width: 32rem;
}

.delete-trip {
  background-color: var(--required-red);
  margin-top: 2rem;
}

header {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
}

.white-box-id {
  padding: 1rem;
  color: black;
  background-color: white;
  margin-bottom: 0;
  margin-top: 2rem;
  font-size: 1.3rem;
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

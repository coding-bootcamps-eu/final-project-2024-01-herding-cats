<template>
  <h2>{{ trip.eventTitle }}</h2>
  <ToggleSwitch labelText="This trip is Public" />
  <section class="overview">
    <p v-if="tripDetails.length < 1" class="initial-text">
      Click "Add Item" to start Herding your Cats
    </p>
    <ul></ul>
    <li v-for="detail in tripDetails" :key="detail.category + Math.floor(Math.random() * 10000)">
      {{ detail.category }}
    </li>
  </section>
  <nav>
    <a href="">View Timeline</a>
  </nav>
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
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
export default {
  data() {
    return {
      trip: {},
      tripDetails: {}
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
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
#trip-id {
  display: flex;
}
.overview {
  margin: 1rem;
  min-height: 10rem;
  background-color: blanchedalmond;
}

.add-options form {
  display: flex;
  flex-direction: column;
}
</style>

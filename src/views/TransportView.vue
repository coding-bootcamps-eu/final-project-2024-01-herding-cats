<template>
  <h2>Transport</h2>
  <main>
    <ul>
      <li
        class="transport-entry"
        v-for="transport of transportEntry"
        :key="transport.category + Math.floor(Math.random() * 10000)"
      >
        <h3>{{ transport.from }}</h3>
        <ul>
          <li>{{ transport.company }}</li>
          <li>{{ transport.startTime }}</li>
          <li>transport.notes</li>
        </ul>
        <button>Edit</button>
      </li>
    </ul>
    <InputForm :item-name="itemName" :begin-name="beginName" :end-name="endName" />
  </main>
</template>

<style scoped>
.transport-entry {
  margin: 0 auto;
  text-align: center;
  max-width: 60%;
}

.transport-entry + .transport-entry {
  border-top: 0.25rem solid black;
  margin-top: 2rem;
  padding-top: 1rem;
}
</style>

<script>
import InputForm from '@/components/InputForm.vue'
export default {
  data() {
    return {
      itemName: 'Transport',
      beginName: 'Departure',
      endName: 'Arrival',
      trip: {},
      tripDetails: []
    }
  },
  computed: {
    transportEntry() {
      let data = []
      this.tripDetails.forEach(function (entry) {
        if (entry.category === 'flight') {
          data.push(entry)
        }
      })
      return data
    }
  },
  components: {
    InputForm
  },
  methods: {
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

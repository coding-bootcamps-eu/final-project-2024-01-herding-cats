<template>
  <h2>Transport</h2>
  <main>
    <ul>
      <li class="transport-entry" v-for="transport of transportList" :key="transport.id">
        <h3>{{ transport.name }}</h3>
        <ul>
          <li>{{ transport.zipcode }} {{ transport.city }}</li>
          <li>{{ transport.address }}</li>
          <li>Departure: {{ transport.startDate }}</li>
          <li>Arrival: {{ transport.endDate }}</li>
          <br />
          <li v-if="transport.notes">Notes: {{ transport.notes }}</li>
        </ul>
        <button class="weiterbtn">Edit</button>
      </li>
    </ul>
    <InputForm
      @clickAdd="getFromChild"
      :item-name="itemName"
      :begin-name="beginName"
      :end-name="endName"
      :placeholder="placeholder"
    />
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
      placeholder: 'e.g. Hauptbahnhof',
      trip: {},
      tripDetails: [],
      transportList: []
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
    },
    getFromChild(data) {
      this.transportList = data
    }
  },
  created() {
    this.loadData()
  }
}
</script>

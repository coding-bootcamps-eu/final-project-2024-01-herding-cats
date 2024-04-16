<template>
  <h2>Transport</h2>
  <main class="container">
    <ul>
      <li class="transport-entry" v-for="transport of tripDetails" :key="transport.id">
        <h3>{{ transport.name }}</h3>
        <ul>
          <li>{{ transport.zipcode }} {{ transport.city }}</li>
          <li>{{ transport.address }}</li>
          <li v-if="transport.startDate">Departure: {{ transport.startDate }}</li>
          <li v-if="transport.endDate">Arrival: {{ transport.endDate }}</li>
          <br />
          <li v-if="transport.notes">Notes: {{ transport.notes }}</li>
        </ul>
        <button>Edit</button>
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
      tripApiUrl: 'http://localhost:3000/events',
      itemName: 'Transport',
      beginName: 'Departure',
      endName: 'Arrival',
      placeholder: 'e.g. Hauptbahnhof',
      tripData: {},
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
    getFromChild(data) {
      this.tripDetails = data
    },
    async loadData(tripId) {
      const response = await fetch(`${this.tripApiUrl}/${tripId}`)
      const apiData = await response.json()
      this.tripData = apiData
      this.tripDetails = this.tripData.details.filter((obj) => obj.category === 'transport')
      console.log(this.tripDetails)
      return this.tripDetails
    },

    async addItem() {
      if (this.newDetails.trim() !== '') {
        this.tripDetails.items.push(this.newDetails.trim())
        this.newDetails = ''
        this.disableBtn = true
      }

      await fetch(`${this.tripApiUrl}/${this.tripId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tripData)
      })
    },

    async deleteItem(index) {
      this.tripDetails.items.splice(index, 1)[0]

      await fetch(`${this.tripApiUrl}/${this.tripId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tripData)
      })
    }
  },
  created() {
    this.tripId = this.$route.params.id
    this.loadData(this.tripId)
  }
}
</script>

<template>
  <h2>Transport</h2>
  <main class="container">
    <ul>
      <li
        class="transport-entry"
        v-for="(transport, index) of transportEntries"
        :key="transport.id"
      >
        <h3>{{ transport.name }}</h3>
        <ul>
          <li>{{ transport.zipcode }} {{ transport.city }}</li>
          <li>{{ transport.address }}</li>
          <li v-if="transport.startDate">Departure: {{ transport.startDate }}</li>
          <li v-if="transport.endDate">Arrival: {{ transport.endDate }}</li>
          <br />
          <li v-if="transport.notes">Notes: {{ transport.notes }}</li>
        </ul>
        <button class="weiterbtn">Edit</button>
        <button class="delete-btn" @click="deleteItem(index)">x</button>
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
import { herdingCatsstore } from '@/stores/counter.js'

export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      state: herdingCatsstore(),
      itemName: 'Transport',
      beginName: 'Departure',
      endName: 'Arrival',
      placeholder: 'e.g. Hauptbahnhof'
    }
  },
  computed: {
    transportEntries() {
      if (this.state.tripData.length > 0) {
        if (this.state.tripData[0].details) {
          return this.state.tripData[0].details.transport
        }
        return []
      } else {
        return []
      }
    }
  },

  components: {
    InputForm
  },
  methods: {
    getFromChild(data) {
      this.transportList = data
    },
    async deleteItem(index) {
      console.log(this.state.tripData[0].details.transport[index])
      this.state.tripData[0].details.transport.splice(index, 1)
      await fetch(`${this.tripApiUrl}/${this.$route.params.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.tripData[0])
      })
    }
  },
  created() {
    this.state.loadTripData(this.$route.params.id)
  }
}
</script>

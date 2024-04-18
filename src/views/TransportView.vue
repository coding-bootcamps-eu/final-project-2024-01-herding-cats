<template>
  <h2>Transport</h2>
  <main>
    <ul>
      <li class="transport-entry" v-for="transport of transportEntries" :key="transport.id">
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
      state: herdingCatsstore(),
      itemName: 'Transport',
      beginName: 'Departure',
      endName: 'Arrival',
      placeholder: 'e.g. Hauptbahnhof'
    }
  },
  computed: {
    transportEntries() {
      let data = []
      this.state.tripData[0].details.forEach(function (entry) {
        if (entry.category === 'transport') {
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
      this.transportList = data
    }
  },
  created() {
    this.state.loadTripData(this.$route.params.id)
  }
}
</script>

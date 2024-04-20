<template>
  <h2>Lodging</h2>
  <main class="container">
    <ul>
      <li class="lodging-entry" v-for="(lodging, index) of lodgingEntries" :key="index">
        <h3>{{ lodging.name }}</h3>
        <ul>
          <li>{{ lodging.zipcode }} {{ lodging.city }}</li>
          <li>{{ lodging.address }}</li>
          <li v-if="lodging.startDate">From: {{ lodging.startDate }}</li>
          <li v-if="lodging.endDate">Until: {{ lodging.endDate }}</li>
          <br />
          <li v-if="lodging.notes">Notes: {{ lodging.notes }}</li>
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
.lodging-entry {
  margin: 0 auto;
  text-align: center;
  max-width: 60%;
}

.lodging-entry + .lodging-entry {
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
      itemName: 'Lodging',
      placeholder: 'e.g. Hauptbahnhof'
    }
  },
  computed: {
    lodgingEntries() {
      if (this.state.tripData.length > 0) {
        if (this.state.tripData[0].details) {
          return this.state.tripData[0].details.lodging
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
      this.lodgingList = data
    },
    async deleteItem(index) {
      this.state.tripData[0].details.lodging.splice(index, 1)
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

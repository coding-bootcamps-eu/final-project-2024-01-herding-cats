<template>
  <div class="container">
    <h2 class="title">Create new trip</h2>

    <label class="required">Name your trip </label>
    <input v-model="tripname" type="text" />

    <label class="required"> Event description </label>
    <input v-model="tripdesc" type="text" />

    <router-link :to="{ name: 'alltravels' }">
      <button @click="makeTrip">Go to overview over your trips</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripname: '',
      tripdesc: '',
      randomId: ''
    }
  },
  methods: {
    makeTrip() {
      if (this.tripname !== '') {
        this.randomId = 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000)
        this.sendData(this.randomId)
      }
    },
    async sendData(randomId) {
      const url = 'http://localhost:3000/'
      const requestBody = {
        id: randomId,
        eventTitle: this.tripname,
        eventDescription: this.tripdesc
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const responseData = await response.json()
    }
  }
}
</script>

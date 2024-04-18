<template>
  <div class="container">
    <h2 class="title">Create new trip</h2>

    <label class="required">Name your trip </label>
    <input v-model="tripname" type="text" />

    <label class="required"> Event description </label>
    <input v-model="tripdesc" type="text" />

    <label class="required"> Start of trip </label>
    <input v-model="tripStart" type="text" />

    <label class="required"> End of trip </label>
    <input v-model="tripEnd" type="text" />

    <router-link :to="{ name: 'alltravels' }">
      <button class="weiterbtn" @click="makeTrip">List of your trips</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripname: '',
      tripdesc: '',
      randomId: '',
      tripStart: '',
      tripEnd: ''
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

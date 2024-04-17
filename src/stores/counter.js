//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const herdingCatsstore = defineStore('registration', {
  state: () => {
    return {
      apiUrl: 'http://localhost:3000/',
      user: {},
      userData: null,
      tripData: []
    }
  },
  actions: {
    async loadUserData() {
      const response = await fetch(this.apiUrl + 'users')
      const apiUserData = await response.json()
      this.userData = apiUserData
      return this.userData
    }

    /*   async loadTripData() {
      const response = await fetch(this.apiUrl + 'events')
      const apiTripData = await response.json()
      this.tripData = apiTripData
      return this.TripData
    } */
  }
})

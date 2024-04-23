//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const herdingCatsstore = defineStore('registration', {
  state: () => {
    return {
      apiUrl: 'http://localhost:3000/',
      user: null,
      userData: null,
      tripData: [],

      userSearchedTrips: []
    }
  },
  actions: {
    async loadUserData() {
      const response = await fetch(this.apiUrl + 'users')
      const apiUserData = await response.json()
      this.userData = apiUserData
      return this.userData
    },

    async loadUserTripData() {
      if (this.user && this.user.trips && this.user.trips.length > 0) {
        for (const tripId of this.user.trips) {
          await this.loadTripData(tripId)
        }
      }
    },

    async loadTripData(tripId) {
      const existingTrip = this.tripData.find((trip) => trip.id === tripId)
      if (!existingTrip) {
        const response = await fetch(this.apiUrl + 'events/' + tripId)
        const apiTripData = await response.json()
        this.tripData.push(apiTripData)
        return this.tripData
      } else {
        return this.tripData
      }
    },

    async deleteTrip(tripId) {
      await fetch(`${this.state.apiUrl}events/${tripId}`, {
        method: 'DELETE'
      })
    }
  }
})

//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const herdingCatsstore = defineStore('registration', {
  state: () => {
    return {
      apiUrl: 'http://localhost:3000/',
      user: {},
      userData: null,
      tripData: [
        {
          eventTitle: 'Ausflug nach Bremen',
          eventStart: '16.05.2024 - 13:30',
          eventEnd: '20.05.2024 - 12:00'
        }
      ],
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
    }
  }
})

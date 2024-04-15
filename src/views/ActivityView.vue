<template>
  <h2>{{ activityEntry.category }}</h2>
  <ul class="activity-info">
    <li>{{ activityEntry.address.city }}</li>
    <li>{{ activityEntry.address.street }}</li>
    <li>{{ activityEntry.startDate }}</li>
    <li>{{ activityEntry.startTime }}</li>
    <li>activityEntry.participants</li>
    <li>activityEntry.notes</li>
  </ul>
  <button>Edit</button>
  <button>Back</button>
</template>

<style>
.activity-info {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      trip: {},
      tripDetails: []
    }
  },
  computed: {
    activityEntry() {
      let data = {}
      this.tripDetails.forEach(function (entry) {
        if (entry.category === 'hotel') {
          data = entry
        }
      })
      return data
    }
  },
  methods: {
    async loadData() {
      const response = await fetch(
        'http://localhost:3000/events/7220e93a-804f-4c9e-880a-8e53e429c1b3'
      )
      const data = await response.json()
      this.trip = data
      this.tripDetails = data.details
    }
  },
  created() {
    this.loadData()
  }
}
</script>

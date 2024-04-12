<template>
  <h2>Lodging</h2>
  <main>
    <ul>
      <li
        class="lodging-entry"
        v-for="lodging of lodgingEntry"
        :key="lodging.category + Math.floor(Math.random() * 10000)"
      >
        <h3>{{ lodging.company }}</h3>
        <ul>
          <li>{{ lodging.address.city }}</li>
          <li>{{ lodging.address.street }}</li>
          <li>{{ lodging.startTime }}</li>
          <li>lodging.notes</li>
        </ul>
        <button>Edit</button>
      </li>
    </ul>
    <button>Back</button>
  </main>
  <footer><button href="">Add new lodging</button></footer>
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
export default {
  data() {
    return {
      trip: {},
      tripDetails: []
    }
  },
  computed: {
    lodgingEntry() {
      let data = []
      this.tripDetails.forEach(function (entry) {
        if (entry.category === 'hotel') {
          data.push(entry)
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

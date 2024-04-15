<template>
  <h2>Lodging</h2>
  <main>
    <ul>
      <li class="lodging-entry" v-for="lodging of lodgingList" :key="lodging.id">
        <h3>{{ lodging.name }}</h3>
        <ul>
          <li>{{ lodging.zipcode }} {{ lodging.city }}</li>
          <li>{{ lodging.address }}</li>
          <li v-if="lodging.startDate">From: {{ lodging.startDate }}</li>
          <li v-if="lodging.endDate">Until: {{ lodging.endDate }}</li>
          <br />
          <li v-if="lodging.notes">Notes: {{ lodging.notes }}</li>
        </ul>
        <button>Edit</button>
      </li>
    </ul>
    <button>Back</button>
    <InputForm @clickAdd="getFromChild" :item-name="itemName" :placeholder="placeholder" />
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
export default {
  data() {
    return {
      itemName: 'Lodging',
      placeholder: 'e.g. Hotel Vier Jahreszeiten',
      trip: {},
      tripDetails: [],
      lodgingList: []
    }
  },
  components: {
    InputForm
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
    },
    getFromChild(data) {
      this.lodgingList = data
    }
  },
  created() {
    this.loadData()
  }
}
</script>

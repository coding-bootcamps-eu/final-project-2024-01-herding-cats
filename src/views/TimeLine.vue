<template>
  <header>
    <img src="../assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />
  </header>
  <main class="container">
    <h3>Timeline</h3>

    <ul class="list">
      <li class="list-item" v-for="(value, index) in allEvents" :key="index">
        <p class="value-name">
          {{ value.name }}
        </p>
        <p class="value-startdate">
          {{ value.startDate }}
        </p>
      </li>
    </ul>
    <!-- <div class="line">
      <div v-for="item in allEvents" :key="item">
        <h3 class="week">{{ weekNumber(item.startDate) }}</h3>
        <h3 class="weekline">{{ item.category }}</h3>
        <h3>{{ item.to }}</h3>
        <p>Start date: {{ item.startDate }}</p>
        <p>Time: {{ item.startTime }}</p>
      </div>
    </div> -->
    <router-link :to="{ path: '/trip/' + this.$route.params.id }"
      ><button>Back to Trip</button></router-link
    >
  </main>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      state: herdingCatsstore(),
      tripData: [],
      allEvents: []
    }
  },
  computed: {
    /*  sortedItems() {
      return this.state.tripData[0].details.slice().sort((a, b) => {
        let datecomp = new Date(a.startDate) - new Date(b.startDate)
        if (datecomp === 0) {
          return a.startTime.localeCompare(b.startTime)
        }
        return datecomp
      })
    } */
  },
  methods: {
    async mergeAndSortEvents() {
      console.log(this.tripData[0])
      const middleData = this.tripData[0]
      console.log(middleData)
      const details = middleData.details
      const filteredDetails = Object.values(details).flatMap((items) =>
        items.filter((item) => item.startDate)
      )
      console.log(filteredDetails)
      this.allEvents = filteredDetails.filter(
        (item) => item.category === 'activity' || item.category === 'transport'
      )
      console.log(this.allEvents)
    }
  },

  /*   // Sort the merged array by startDate
      this.allEvents.sort((a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)
        return dateA - dateB
      }) */
  //return this.allEvents

  created() {
    this.state.loadTripData(this.$route.params.id)
    console.log(this.state.tripData)
    this.tripData = this.state.tripData
  },
  beforeMount() {
    this.mergeAndSortEvents()
  }
}
</script>

<style scoped>
.list {
  margin-top: 2rem;
}
.list-item {
  display: block;
}
.value-name {
  margin: 0;
}
.value-startdate {
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  font-size: 1.5rem;
}
header {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
}
.week {
  text-align: left;
}

.weekline {
  border-top: 2px solid white;
  text-align: left;
}

.container {
  margin: 0.7rem auto;
  background-color: var(--yellow-calendar);
}

h2 {
  color: black;
}
</style>

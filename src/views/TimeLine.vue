<template>
  <header>
    <img src="../assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />
  </header>
  <main class="container">
    <h3>Timeline</h3>

    <ul class="list">
      <li class="list-item" v-for="(value, index) in sortedEvents" :key="index">
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
    sortedEvents() {
      return this.allEvents.slice().sort((a, b) => {
        const [dayA, monthA, yearA, timeA] = a.startDate.split(/[.\s-]+/)
        const [dayB, monthB, yearB, timeB] = b.startDate.split(/[.\s-]+/)

        const dateA = new Date(`${yearA}-${monthA}-${dayA}T${timeA}`)
        const dateB = new Date(`${yearB}-${monthB}-${dayB}T${timeB}`)

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          console.error('Invalid date format:', a.startDate, b.startDate)
          return 0
        }

        return dateA - dateB
      })
    }
  },
  methods: {
    async mergeAndSortEvents() {
      const middleData = this.tripData[0]
      const details = middleData.details
      const filteredDetails = Object.values(details).flatMap((items) =>
        items.filter((item) => item.startDate)
      )
      this.allEvents = filteredDetails.filter(
        (item) => item.category === 'activity' || item.category === 'transport'
      )
    }
  },

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
  min-height: 10rem;
}

h2 {
  color: black;
}
</style>

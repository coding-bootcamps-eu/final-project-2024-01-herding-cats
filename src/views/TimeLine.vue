<template>
  <div class="container">
    <h1>Timeline</h1>

    <div class="line">
      <div v-for="item in sortedItems" :key="item.id">
        <h2 class="week">{{ weekNumber(item.startDate) }}</h2>
        <h2 class="weekline">{{ item.category }}</h2>
        <h3>{{ item.to }}</h3>
        <p>Start date: {{ item.startDate }}</p>
        <p>Time: {{ item.startTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          category: 'flight',
          startDate: '2015-03-25',
          startTime: '9:45',
          from: 'Hamburg Flughafen',
          to: 'Malaga Airport',
          gate: 'D4',
          company: 'Musterflüge',
          seat: '234',
          id: '222352'
        },
        {
          category: 'flight',
          startDate: '2015-03-28',
          startTime: '9:30',
          from: 'Frankfurt Flughafen',
          to: 'Malaga Airport',
          gate: 'D2',
          company: 'Musterflüge',
          seat: '24',
          id: '536272'
        },
        {
          category: 'flight',
          startDate: '2015-01-25',
          startTime: '9:45',
          from: 'Hamburg Flughafen',
          to: 'Stockholm Airport',
          gate: 'D4',
          company: 'Musterflüge',
          seat: '234',
          id: '33333'
        }
      ]
    }
  },
  computed: {
    sortedItems() {
      return this.items.slice().sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    }
  },
  methods: {
    weekNumber(startDate) {
      //define a date object variable that will take the current system date
      const todaydate = new Date(startDate)

      //find the year of the current date
      let oneJan = new Date(todaydate.getFullYear(), 0, 1)

      // calculating number of days in given year before a given date
      let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000))

      // adding 1 since to current date and returns value starting from 0
      let result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7)

      console.log(result)

      return 'Week ' + result
    }
  }
}
</script>

<style scoped>
.week {
  text-align: left;
}

.weekline {
  border-top: 2px solid white;
  text-align: left;
}

.container {
  margin: 0.7rem auto;
  font-family: 'Satoshi-Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.7rem;
  width: 32rem;
  height: 4rem;
  border: 0.1rem solid var(--dark-button-blue);
  box-shadow: 0px 0.2rem 0.4rem rgba(0, 0, 0, 0.25);
}
</style>

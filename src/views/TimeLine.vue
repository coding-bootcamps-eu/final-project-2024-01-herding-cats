<template>
  <div class="container">
    <h2>Timeline</h2>

    <div class="line">
      <div v-for="item in sortedItems" :key="item.id">
        <h3 class="week">{{ weekNumber(item.startDate) }}</h3>
        <h3 class="weekline">{{ item.category }}</h3>
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
          startDate: '2015-01-25',
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
          startTime: '9:30',
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
      // 2024-04-16T09:30:00:
      return this.items.slice().sort((a, b) => {
        let datecomp = new Date(a.startDate) - new Date(b.startDate)
        if (datecomp === 0) {
          return a.startTime.localeCompare(b.startTime)
        }
        return datecomp
      })
    }
  },
  methods: {
    weekNumber(startDate) {
      //object with current date
      const todaydate = new Date(startDate)

      //object für den 1. Januar des jetzigen Jahres
      // let oneJan = new Date(todaydate.getFullYear(), 0, 1)

      // // number of days between 1. Januar and today (24 Std./Tag, 60 min./std., 60 sec./min, 1000 Millisekunden/ sec.
      // let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000))

      // Kalenderwoche:
      let daynr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let weekday = todaydate.getDay()
      let weekday2 = daynr[parseInt(weekday)]
      // let result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7)

      return weekday2
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

<template>
  <button class="delete-trip" @click="deleteTrip">Delete Trip</button>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  name: 'DeleteButton',
  props: {},
  data() {
    return {
      state: herdingCatsstore()
    }
  },
  methods: {
    async deleteTrip() {
      await fetch(`${this.state.apiUrl}events/${this.$route.params.id}`, {
        method: 'DELETE'
      })
      this.$router.push({ name: 'alltravels' })
    }
  }
}
</script>
<style scoped>
.delete-trip {
  background-color: var(--required-red);
  margin-top: 2rem;
}
</style>

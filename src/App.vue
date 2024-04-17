<template>
  <router-view />
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      state: herdingCatsstore()
    }
  },
  created() {
    this.state.loadUserData()
  }
}
</script>

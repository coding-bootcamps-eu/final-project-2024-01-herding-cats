<template>
  <button @click="logOutUser">Log Out</button>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      name: 'LogoutButton',
      state: herdingCatsstore()
    }
  },
  methods: {
    logOutUser() {
      localStorage.removeItem('loggedUser')
      this.$router.push({ name: 'logout' })
    }
  }
}
</script>

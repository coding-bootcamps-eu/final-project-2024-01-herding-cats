<template>
  <div class="container">
    <h2 class="title">LogIn</h2>
    <label class="required"> E-mail </label>
    <input type="email" v-model="email" />

    <label class="required"> Password </label>
    <input type="password" v-model="password" />

    <router-link :to="{ name: 'alltravels' }">
      <button class="weiterbtn" @click="logIn">LogIn</button>
    </router-link>

    <h3>Welcome back!</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    logIn() {}
  }
}
</script>

<style scoped>
h3 {
  margin-top: 10rem;
}
</style>

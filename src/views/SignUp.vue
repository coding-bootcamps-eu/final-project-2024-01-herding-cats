<template>
  <div class="container">
    <h1>Sign Up</h1>

    <form>
      <input type="text" placeholder="First name" v-model="firstname" />
      <span class="asterisk">*</span>
      <input type="text" placeholder="Last name" v-model="lastname" />
      <input type="text" placeholder="E-mail" v-model="email" />
      <input type="text" placeholder="Address" v-model="address" />
      <input type="text" placeholder="Phone" v-model="phone" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" />
    </form>
    <button @click="createAccount">Create Account</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    createAccount() {
      // Implement your account creation logic here
      // You can access form data using this.name, this.email, etc.
      // Validate form data and perform necessary actions
    }
  }
}
</script>

<style scoped></style>

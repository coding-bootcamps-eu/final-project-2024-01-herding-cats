<template>
  <div class="container">
    <h2 class="title">Sign Up</h2>

    <form>
      <label class="required">First Name</label>
      <input type="text" />

      <label class="required">Last Name</label>
      <input type="text" />

      <label class="required">E-Mail</label>
      <input type="email" />

      <label>Address</label>
      <input type="text" />

      <label>Phone</label>
      <input type="text" />

      <label class="required">Password</label>
      <input type="password" />

      <label class="required">Confirm Password</label>
      <input type="password" />
    </form>
    <button class="weiterbtn" @click="createAccount">Create Account</button>
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
    createAccount() {}
  }
}
</script>

<style scoped></style>

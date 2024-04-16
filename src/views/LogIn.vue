<template>
  <div class="container">
    <h2 class="title">LogIn</h2>
    <label class="required"> E-mail </label>
    <input type="email" v-model="email" />

    <div class="info">
      <label class="required">
        Password
        <span class="info-icon" @mouseover="showInfo" @mouseleave="hideInfo">&#9432;</span>
        <span class="extra-info">
          Password must contain:
          <ul>
            <li>min. 8 characters</li>
            <li>min. 1 uppercase letter</li>
            <li>min. 1 lowercase letter</li>
            <li>min. 1 digit</li>
          </ul>
        </span>
      </label>
      <input type="password" v-model="password" />
    </div>

    <router-link @click.prevent="logIn" :to="validation() ? { name: 'alltravels' } : ''">
      <button class="weiterbtn">LogIn</button>
    </router-link>
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
    validation() {
      if (
        this.email === '' ||
        this.password.length < 8 ||
        !/[A-Z]/.test(this.password) ||
        !/[a-z]/.test(this.password) ||
        !/\d/.test(this.password)
      ) {
        return false
      } else {
        return true
      }
    },
    logIn() {
      if (!this.validation()) {
        alert(`Please make sure your e-mail address and password are entered correctly.
    Your password must contain:
    - min. 8 characters
    - min. 1 uppercase letter
    - min. 1 lowercase letter
    - min. 1 digit`)
        return
      }
    }
  }
}
</script>

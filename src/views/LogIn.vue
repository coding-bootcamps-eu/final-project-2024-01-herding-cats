<template>
  <header>
    <img src="@/assets/cat-logo/cat-logo-large.svg" width="200px" alt="Herding Cats Logo" />
    <h2>Login</h2>
  </header>
  <main>
    <div class="container">
      <label for="e-mail"><h3 class="required">E-Mail</h3></label>
      <input type="email" id="e-mail" v-model="email" placeholder=" example@example.com" />

      <!--  Password stuff     
        Saved for later - nice to have
        <div class="info">
        <label for="pw">
          <p class="required">
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
          </p>
        </label>
        <input type="password" id="pw" v-model="password" />
      </div> -->
      <button @click="logIn()">LogIn</button>
    </div>
  </main>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      state: herdingCatsstore(),
      email: ''
      //password: ''
    }
  },

  methods: {
    validation() {
      this.state.user = this.state.userData.find((user) => user.email === this.email)
      if (this.state.user) {
        this.state.tripData = []
        this.state.loadUserTripData()
        return true
      } else {
        return false
      }
    },
    logIn() {
      if (this.validation()) {
        this.$router.push({ name: 'alltravels' })
      } else {
        alert('Please make sure your e-mail address is entered correctly.')
      }
    }
  }
}
/* Password Validation stuff
Your password must contain:
    - min. 8 characters
    - min. 1 uppercase letter
    - min. 1 lowercase letter
    - min. 1 digit`
         ||
          this.password.length < 8 ||
          !/[A-Z]/.test(this.password) ||
          !/[a-z]/.test(this.password) ||
        !/\d/.test(this.password)
        */
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin: 2rem auto;
  width: 100vw;
  height: 22.7rem;
}
.container {
  background-color: var(--pink-activities);
  min-height: auto;
}

/* style for password information

.info {
  position: relative;
}

.info .extra-info {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  width: max-content;
}

.info:hover .extra-info,
.info .info-icon:hover + .extra-info {
  display: block;
}
*/
</style>

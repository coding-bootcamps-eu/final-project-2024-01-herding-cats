<template>
  <header><img src="@/assets/cat-logo/cat-logo-large.svg" alt="Herding Cats Logotype" /></header>
  <main class="start-page-main">
    <h1>Herding Cats</h1>
    <h2>Travel App</h2>
    <h3>Manage the Impossible</h3>
    <div class="start-button-input">
      <router-link :to="{ name: 'newTrip' }"><button>New Trip</button></router-link>
      <form>
        <input
          type="text"
          name="trip-id"
          id="trip-id"
          placeholder=" # Enter a Trip ID"
          v-model="tripId"
          @input="checkValidId"
        />
        <router-link :to="'/trip/' + tripId">
          <button :disabled="disableGoBtn" :class="{ 'btn-disabled': disableGoBtn }">
            Go to Trip
          </button></router-link
        >
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tripId: '',
      disableGoBtn: true
    }
  },
  computed: {
    tripLink() {
      if (this.tripId === '') {
        return '/trip'
      } else {
        return '/trip/' + this.tripId
      }
    }
  },
  methods: {
    checkValidId() {
      if (this.tripId.trim().length >= 5) {
        this.disableGoBtn = false
      } else {
        this.disableGoBtn = true
      }
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100vw;
  height: 25.7rem;
}
img {
  padding: 3rem;
  margin-left: 1.5rem;
}
h2 {
  margin-top: 3rem;
}
h3 {
  margin-top: 2rem;
  color: white;
  font-weight: 400;
  text-shadow: 0px 0.2rem 0.2rem rgba(255, 255, 255, 0.25);
}
input[type='text'] {
  margin-top: 3rem;
}
.start-page-main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 50vh;
}
.start-button-input {
  margin-top: auto;
}
</style>

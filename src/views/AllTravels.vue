<template>
  <div class="container">
    <h2>Your trips</h2>

    <div @mouseover="showSidebar = true" @mouseleave="hideSidebar" class="hamburger-menu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <transition name="slide">
      <div v-show="showSidebar" class="sidebar">
        <ul>
          <li>Log Out</li>
          <li><router-link to="/notes">Link zu NotesVue</router-link></li>
          <li>Neue Reise erstellen</li>
        </ul>
      </div>
    </transition>

    <div class="calendar-placeholder">Calendar placeholder</div>

    <div class="calendar-list">
      <h3>List of your trips</h3>
      <ul>
        <li>Stockholm Reise - TripID</li>
        <li>Wandern Rheinland - TripID</li>
      </ul>
    </div>

    <form>
      <label for="fname">Search trip to join</label>
      <input
        type="search"
        placeholder="&#x1F50D; search..."
        id="fname"
        name="fname"
        @keyup="searchPublicTrip"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false
    }
  },
  methods: {
    hideSidebar() {
      setTimeout(() => {
        this.showSidebar = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.hamburger-menu {
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 3px;
  background-color: #000;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.slide-enter-active {
  transition: transform 0.3s;
}

.slide-leave-active {
  transition: transform 1s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-200px);
}

.calendar-placeholder {
  width: 30rem;
  height: 25rem;
  background-color: white;
  border: 2px solid black;
  margin-top: 3rem;
}

.calendar-list {
  margin-top: 3rem;
}

.calendar-list ul li {
  list-style-position: inside;
  list-style-type: circle;
}

input[type='submit'] {
  font-size: 1.3em;
  padding: 5px 12px;
  font-weight: 300;
  color: grey;
  border: 1px solid silver;
  background-image: linear-gradient(to top, gainsboro 0%, white 90%);
  border-radius: 20px;
}

form {
  margin-top: 3rem;
}
</style>

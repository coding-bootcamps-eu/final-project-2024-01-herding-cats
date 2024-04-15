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
          <li><router-link to="/newtrip">Create new trip</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
          <li><router-link to="/logout">Log Out</router-link></li>
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
        type="text"
        class="icon"
        value
        placeholder="Search"
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
      }, 2000)
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
  margin-top: 5px;
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
  padding-left: 5px;
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

.icon {
  padding-left: 25px;
  background: url('https://static.thenounproject.com/png/101791-200.png') no-repeat left;
  background-size: 20px;
  margin: 0.7rem auto;
}

form {
  margin-top: 3rem;
}
</style>

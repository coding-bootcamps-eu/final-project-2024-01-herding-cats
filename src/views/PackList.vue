<template>
  <div id="note-list">
    <header class="trip-view-header">
      <img src="@/assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logotype" />
    </header>
    <main class="container">
      <h3>Packing List</h3>
      <ul class="list">
        <li v-for="(item, index) of tripDetails.items" :key="index" class="list-item">
          <p>{{ item }}</p>
          <button class="delete-btn" @click="deleteItem(index)">x</button>
        </li>
      </ul>
      <div class="input-area">
        <textarea
          class="input-text-area"
          v-model="newDetails"
          id="item-input"
          placeholder="Add stuff to bring"
          @keyup.enter="addItem"
          @input="checkInput"
        ></textarea>
        <button @click="addItem" :disabled="disableBtn" :class="{ 'btn-disabled': disableBtn }">
          Add Item
        </button>
        <router-link :to="{ path: '/trip/' + this.tripId }"
          ><button>Back to Trip</button></router-link
        >
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      newDetails: '',
      tripData: [],
      tripId: '',
      tripDetails: [],
      disableBtn: true
    }
  },

  methods: {
    checkInput() {
      if (this.newDetails.trim().length >= 1) {
        this.disableBtn = false
      } else {
        this.disableBtn = true
      }
    },

    async loadData(tripId) {
      const response = await fetch(`${this.tripApiUrl}/${tripId}`)
      const apiData = await response.json()
      this.tripData = apiData
      this.tripDetails = this.tripData.details.find((obj) => obj.category === 'packlist')
      return this.tripDetails
    },

    async addItem() {
      if (this.newDetails.trim() !== '') {
        this.tripDetails.items.push(this.newDetails.trim())
        this.newDetails = ''
        this.disableBtn = true
      }

      await fetch(`${this.tripApiUrl}/${this.tripId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tripData)
      })
    },

    async deleteItem(index) {
      this.tripDetails.items.splice(index, 1)[0]

      await fetch(`${this.tripApiUrl}/${this.tripId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tripData)
      })
    }
  },
  created() {
    this.tripId = this.$route.params.id
    this.loadData(this.tripId)
  }
}
</script>

<style scoped>
.list {
  margin-top: 2rem;
}

h3 {
  color: white;
}
.delete-btn {
  margin: 0;
  padding: 0;
  min-height: 2rem;
  min-width: 2rem;
  max-height: 2rem;
  max-width: 2rem;
  font-size: 1rem;
}

.trip-view-header {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 32rem;
  height: 4rem;
}
.list-item {
  display: flex;
  align-items: baseline;
}

.list-item p {
  max-width: 24rem;
  color: white;
  margin-right: auto;
  margin-top: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
}

.input-area {
  margin-top: auto;
}
</style>

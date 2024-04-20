<template>
  <header>
    <img src="@/assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logotype" />
  </header>
  <main class="container">
    <h3>Packing List</h3>
    <ul class="list">
      <li
        v-for="(item, index) of this.state.tripData[0].details.packlist"
        :key="index"
        class="list-item"
      >
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
      ></textarea>
      <button @click="addItem" :disabled="checkInput" :class="{ 'btn-disabled': checkInput }">
        Add Item
      </button>
      <router-link :to="{ path: '/trip/' + this.$route.params.id }"
        ><button>Back to Trip</button></router-link
      >
    </div>
  </main>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      state: herdingCatsstore(),
      newDetails: ''
    }
  },
  computed: {
    checkInput() {
      if (this.newDetails.trim().length >= 1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async addItem() {
      if (this.newDetails.trim() !== '') {
        this.state.tripData[0].details.packlist.push(this.newDetails.trim())
        this.newDetails = ''
      }
      await fetch(`${this.state.apiUrl}events/${this.$route.params.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.tripData[0])
      })
    },

    async deleteItem(index) {
      this.state.tripData[0].details.packlist.splice(index, 1)

      await fetch(`${this.state.apiUrl}events/${this.$route.params.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.tripData[0])
      })
    }
  },
  created() {
    this.state.loadTripData(this.$route.params.id)
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

header {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
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

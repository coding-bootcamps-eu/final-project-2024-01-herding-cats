<template>
  <form class="addLodging">
    <div class="inputtext">
      <label for="item-name">{{ itemName }}:</label>
      <input id="item-name" v-model="newLodging.name" placeholder="e. g. Max Mustermann" />
    </div>
    <div class="inputtext">
      <label v-if="isLodging" for="zipcode">Zipcode:</label>
      <input v-if="isLodging" id="zipcode" v-model="newLodging.endDate" />
      <label v-if="isLodging" for="city">City:</label>
      <input v-if="isLodging" id="city" v-model="newLodging.endDate" />
      <label v-if="isLodging" for="adress">Adress:</label>
      <input v-if="isLodging" id="adress" v-model="newLodging.endDate" />
      <label for="begin">Begin:</label>
      <input type="date" id="begin" v-model="newLodging.startDate" />
      <label for="end">End:</label>
      <input type="date" id="end" v-model="newLodging.endDate" />
      <label v-if="isLodging" for="notes">Notes:</label>
      <input v-if="isLodging" id="notes" v-model="newLodging.endDate" />
    </div>
    <div v-if="isGroupMembers" class="admin">
      <input type="checkbox" v-model="newLodging.isAdmin" />
      <label>Admin</label>
    </div>
  </form>
  <footer><button @click.prevent="addLodging">Add new lodging</button></footer>
</template>

<script>
export default {
  data() {
    return {
      trip: {},
      tripDetails: [],
      newLodging: {
        category: 'hotel',
        company: 'test',
        name: '',
        startDate: '',
        endDate: '',
        isAdmin: false,
        id: 1
      }
    }
  },

  props: {
    itemName: String
  },

  computed: {
    isGroupMembers() {
      return this.$route.name === 'groupmembers'
    },
    isLodging() {
      return this.$route.name === 'Lodging'
    }
  },

  methods: {
    addLodging() {
      if (this.newLodging.name.trim() === '') {
        alert('Enter the name of the participant')
      } else {
        this.tripDetails.push({ ...this.newLodging })
        console.log(this.tripDetails)
        this.newLodging.id = Math.floor(Math.random() * 1000000).toString()
        this.newLodging.name = ''
        this.newLodging.startDate = ''
        this.newLodging.endDate = ''
        this.newLodging.isAdmin = false
      }
    }
  }
}
</script>

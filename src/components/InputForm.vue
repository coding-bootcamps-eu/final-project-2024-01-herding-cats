<template>
  <dialog ref="add-item">
    <form method="dialog" class="addLodging">
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
        <input id="set-admin" type="checkbox" v-model="newLodging.isAdmin" />
        <label for="set-admin">Admin</label>
      </div>
      <button>Cancel</button>
    </form>
  </dialog>
  <footer>
    <button @click.prevent="openDialog">Add new {{ itemName }}</button>
  </footer>
</template>

<style>
.inputtext input {
  margin-bottom: 10px;
  display: block;
}

.admin input {
  margin-right: 5px;
}
</style>

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
    },
    openDialog() {
      this.$refs['add-item'].showModal()
    }
  }
}
</script>

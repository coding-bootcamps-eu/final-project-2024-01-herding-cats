<template>
  <dialog ref="add-item">
    <form method="dialog" class="addLodging">
      <div class="inputtext">
        <label for="item-name">{{ itemName }}:</label>
        <input id="item-name" v-model="newLodging.name" placeholder="e. g. Max Mustermann" />
      </div>
      <div class="inputtext">
        <label v-if="isLodging || isTransport" for="zipcode">Zipcode:</label>
        <input v-if="isLodging || isTransport" id="zipcode" v-model="newLodging.endDate" />
        <label v-if="isLodging || isTransport" for="city">City:</label>
        <input v-if="isLodging || isTransport" id="city" v-model="newLodging.endDate" />
        <label v-if="isLodging || isTransport" for="adress">Adress:</label>
        <input v-if="isLodging || isTransport" id="adress" v-model="newLodging.endDate" />
        <label for="begin">{{ beginName }}:</label>
        <input type="datetime-local" id="begin" v-model="newLodging.startDate" />
        <label for="end">{{ endName }}:</label>
        <input type="datetime-local" id="end" v-model="newLodging.endDate" />
        <label v-if="isLodging || isTransport" for="notes">Notes:</label>
        <input v-if="isLodging || isTransport" id="notes" />
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
    itemName: String,
    beginName: {
      type: String,
      default: 'From'
    },
    endName: {
      type: String,
      default: 'Until'
    }
  },

  computed: {
    isGroupMembers() {
      return this.$route.name === 'groupmembers'
    },
    isLodging() {
      return this.$route.name === 'Lodging'
    },
    isTransport() {
      return this.$route.name === 'Transport'
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

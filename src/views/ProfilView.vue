<template>
  <div class="container">
    <h2>Profil page</h2>
    <p class="fineprint">Click enter to submit your edits</p>
    <div>
      <label class="required" for="name">Name:</label>
      <div class="underline" v-if="!editingName" @click="startEditing('name')">
        {{ name }}
      </div>
      <!-- Wenn div === false, dann wird das div angezeigt -->
      <input v-else type="text" v-model="nameInput" @keyup.enter="finishEditing('name')" />
    </div>

    <div>
      <label for="adresse">Address:</label>
      <div class="underline" v-if="!editingAdresse" @click="startEditing('adresse')">
        {{ adresse }}
      </div>
      <!-- Wenn div === false, dann wird das div angezeigt sonst input -->
      <input v-else type="text" v-model="adresseInput" @keyup.enter="finishEditing('adresse')" />
    </div>

    <div>
      <label for="tele">Phone:</label>
      <label class="fineprint">(use the +49 formate)</label>
      <div class="underline" v-if="!editingPhone" @click="startEditing('tele')">{{ tele }}</div>
      <!-- Wenn div === false, dann wird das div angezeigt -->
      <input v-else type="text" v-model="teleInput" @keyup.enter="finishEditing('tele')" />
      <img src="../assets/WhatsApp.svg.png" />
    </div>
  </div>

  <router-link :to="{ path: '/groupmembers/' + this.$route.params.id }"
    ><button>Back to Group Members</button></router-link
  >
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      state: herdingCatsstore(),
      editingName: false,
      nameInput: '',

      editingAdresse: false,
      adresseInput: '',

      editingPhone: false,
      teleInput: ''
    }
  },
  computed: {
    currentGroupMember() {
      return this.state.tripData[0].details.groupmembers.find(
        (item) => item.id === this.$route.params.index
      )
    },
    name() {
      return this.currentGroupMember.name + ' - click to change'
    },
    adresse() {
      return this.currentGroupMember.address + ' - click to change'
    },
    tele() {
      return this.currentGroupMember.tele + ' - click to change'
    }
  },

  methods: {
    startEditing(inputFeld) {
      if (inputFeld === 'name') {
        this.editingName = true
      }
      if (inputFeld === 'adresse') {
        this.editingAdresse = true
      }
      if (inputFeld === 'tele') {
        this.editingPhone = true
      }
    },
    async finishEditing(inputFeld) {
      if (inputFeld === 'name') {
        this.editingName = false
        this.name = this.nameInput
        this.currentGroupMember.name = this.nameInput
      }
      if (inputFeld === 'adresse') {
        this.editingAdresse = false
        this.adresse = this.adresseInput
        this.currentGroupMember.address = this.adresseInput
      }
      if (inputFeld === 'tele') {
        this.editingPhone = false
        this.tele = this.teleInput
        this.currentGroupMember.tele = this.teleInput
      }
      await fetch(`${this.tripApiUrl}/${this.$route.params.id}/`, {
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
.underline {
  text-decoration: underline;
}
.fineprint {
  color: var(--turqoise-gray-background);
  font-size: 1rem;
}

img {
  width: 3rem;
}
</style>

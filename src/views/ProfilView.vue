<template>
  <div class="container">
    <h2>Profil page</h2>
    <aside class="profile-text" v-if="isUserThere">click on an entry to change it</aside>
    <p v-if="isUserThere" class="fineprint profile-text">Click enter to submit your edits</p>
    <div class="profile-entry profile-text">
      <label class="required" for="name">Name:</label>
      <div class="underline" v-if="!editingName" @click="startEditing('name')">
        {{ name }}
      </div>
      <!-- Wenn div === false, dann wird das div angezeigt -->
      <input v-else type="text" v-model="nameInput" @keyup.enter="finishEditing('name')" />
    </div>

    <div class="profile-entry profile-text">
      <label for="adresse">Address:</label>
      <div class="underline" v-if="!editingAdresse" @click="startEditing('adresse')">
        {{ adresse }}
      </div>
      <!-- Wenn div === false, dann wird das div angezeigt sonst input -->
      <input v-else type="text" v-model="adresseInput" @keyup.enter="finishEditing('adresse')" />
    </div>

    <div class="profile-entry profile-text">
      <label for="tele">Phone:</label>
      <label v-if="isUserThere" class="fineprint profile-text">(use the +49 formate)</label>
      <div class="underline" v-if="!editingPhone" @click="startEditing('tele')">{{ tele }}</div>
      <!-- Wenn div === false, dann wird das div angezeigt -->
      <input v-else type="text" v-model="teleInput" @keyup.enter="finishEditing('tele')" />
      <br />
      <a @click="sendMessage" href="'https://wa.me/' + 4915754288565">
        <!-- Like this:
https://wa.me/552196312XXXX
NOT like this:
https://wa.me/+55(021)96312-XXXX -->

        <img src="../assets/WhatsApp.svg.png" alt="Click here to send a message" />
      </a>
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
      isUserThere: false,
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
      if (this.state.tripData[0]) {
        return this.state.tripData[0].details.groupmembers.find(
          (item) => item.id === this.$route.params.index
        )
      } else {
        return []
      }
    },
    name() {
      return '-' + this.currentGroupMember.name
    },
    adresse() {
      return '-' + this.currentGroupMember.address
    },
    tele() {
      return '-' + this.currentGroupMember.tele
    }
  },

  methods: {
    async checkUser() {
      console.log(this.state.user)
      if (this.state.user === null || Object.keys(this.state.user).length === 0) {
        this.isUserThere = false
      } else {
        this.isUserThere = true
      }
    },
    sendMessage() {
      const phoneNumber = this.teleInput.replace(/\D/g, '')
      const whatsappLink = `https://wa.me/${phoneNumber}`
      window.open(whatsappLink)
    },

    startEditing(inputFeld) {
      if (this.isUserThere) {
        if (inputFeld === 'name') {
          this.editingName = true
        }
        if (inputFeld === 'adresse') {
          this.editingAdresse = true
        }
        if (inputFeld === 'tele') {
          this.editingPhone = true
        }
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
    this.checkUser()
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
.profile-entry {
  margin-top: 2rem;
}

.profile-text {
  font-size: 1.75rem;
}

aside {
  text-align: center;
  font-style: italic;
}

img {
  width: 3rem;
}
</style>

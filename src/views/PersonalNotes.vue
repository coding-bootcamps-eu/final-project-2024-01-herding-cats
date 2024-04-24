<template>
  <header>
    <img src="@/assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />
  </header>
  <main class="container">
    <h2 class="title">Your personal notes</h2>
    <div id="app">
      <!-- Iteriere über die Notizen -->
      <div v-for="(note, index) in notes" :key="index" class="note-container">
        <template v-if="!editMode[index]">
          <!-- Div anzeigen, wenn nicht im Bearbeitungsmodus -->
          <div class="text" @click="startEditing(index)">{{ note }}</div>
        </template>
        <template v-else>
          <!-- Textarea anzeigen, wenn im Bearbeitungsmodus -->
          <textarea
            class="note"
            v-model="notes[index]"
            @keyup.enter="finishEditing(index)"
          ></textarea>
        </template>
        <button class="delete-note" @click="deleteNote(index)">x</button>
      </div>
      <button class="add-note" @click="addNote" type="button">+</button>

      <router-link :to="{ path: '/AllTravels/' }"><button>Back to Trip</button></router-link>
    </div>
  </main>
</template>

<script>
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      notes: ['Take notes and click enter once you are done'],
      editMode: [false],
      state: herdingCatsstore()
    }
  },
  methods: {
    startEditing(index) {
      this.editMode[index] = true
    },
    finishEditing(index) {
      this.submitNote()
      this.editMode[index] = false
    },
    addNote() {
      this.notes.push('')
      this.editMode.push(true)
    },
    async deleteNote(index) {
      this.notes.splice(index, 1)
      this.editMode.splice(index, 1)
      this.submitNote()
    },
    async submitNote() {
      const userId = JSON.parse(localStorage.getItem('loggedUser')).id
      const currentUser = this.state.userData.find((data) => data.id === userId)
      currentUser.notes = this.notes.slice()

      await fetch(`${this.state.apiUrl}users/${userId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      })
    }

    // async deleteItem(index) {
    //   const userId = JSON.parse(localStorage.getItem('loggedUser')).id
    //   const currentUser = this.state.userData.find((data) => data.id === userId)
    //   currentUser.notes.splice(index, 1)

    //   await fetch(`${this.state.apiUrl}users/${userId}/`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(currentUser)
    //   })
    // }
  },
  async created() {
    console.log('created() hook called')
    await this.state.loadUserData()

    const userId = JSON.parse(localStorage.getItem('loggedUser')).id
    const currentUser = this.state.userData.find((user) => user.id === userId)
    if (currentUser.notes) {
      this.notes = currentUser.notes || []
    }
  }
}
</script>

<style scoped>
header {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
}
.note-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.note {
  flex: 1;
  width: 50px;
  height: 48px;
  box-sizing: border-box;
  padding: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.delete-note {
  margin-left: 10px;
  height: 50px;
  width: 50px;
  box-sizing: border-box;
  outline: none;
  background-color: rgba(247, 243, 243, 0.1);
  color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.text {
  flex: 1;
  height: 50px;
  box-sizing: border-box;
  padding: 20px;
  border: none;
  border-radius: 10px;
  background: #ffa;
  background-image: linear-gradient(150deg, #efec88 0%, #fefabc 100%);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.container {
  background-color: var(--turqoise-notes);
}
</style>

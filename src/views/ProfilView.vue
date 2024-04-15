<template>
  <div class="container">
    <h2>Profil page</h2>
    <p class="fineprint">Click enter to submit your edits</p>
    <div>
      <label class="required" for="name">Name:</label>
      <div class="underline" v-if="!editingName" @click="startEditing('name')">{{ name }}</div>
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
</template>

<script>
export default {
  data() {
    return {
      editingName: false,
      name: 'click to change',
      nameInput: '',

      editingAdresse: false,
      adresse: 'click to change',
      adresseInput: '',

      editingPhone: false,
      tele: 'click to change',
      teleInput: ''
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
    finishEditing(inputFeld) {
      if (inputFeld === 'name') {
        this.editingName = false
        this.name = this.nameInput
      }
      if (inputFeld === 'adresse') {
        this.editingAdresse = false
        this.adresse = this.adresseInput
      }
      if (inputFeld === 'tele') {
        this.editingPhone = false
        this.tele = this.teleInput
      }
    }
  }
}
</script>

<style>
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

<template>
  <div id="note-list" class="container">
    <h2 class="title">Notes</h2>

    <div id="input-area">
      <textarea
        v-model="newNotes"
        id="note-input"
        placeholder="Take notes for your trip ..."
        @keydown.enter="addNote"
      ></textarea>
    </div>

    <div v-for="(note, index) in notes" :key="index" class="note">
      <ul class="note-content">
        <li>
          {{ note }}
          <button class="delete-btn" @click="deleteNote(index)">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNotes: '',
      notes: []
    }
  },
  methods: {
    addNote() {
      if (this.newNotes.trim() !== '') {
        this.notes.push(this.newNotes.trim())
        this.newNotes = ''
      }
    },

    deleteNote(index) {
      this.notes.splice(index, 1)
    }
  }
}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

template {
  background: #f1f1f1;
  font-family:
    helvetica neue,
    helvetica,
    arial,
    sans-serif;
  font-weight: 200;
}
#note-list {
  width: 960px;
  height: 1109px;
  background: linear-gradient(to bottom, white 29px, #00b0d7 1px);
  margin: 50px auto;
  background-size: 100% 30px;
  position: relative;
  padding-top: 150px;
  padding-left: 160px;
  padding-right: 20px;
  overflow: hidden;
  border-radius: 5px;
  -webkit-box-shadow:
    3px 3px 3px rgba(0, 0, 0, 0.2),
    0px 0px 6px rgba(0, 0, 0, 0.2);
  -moz-box-shadow:
    3px 3px 3px rgba(0, 0, 0, 0.2),
    0px 0px 6px rgba(0, 0, 0, 0.2);
  -ms-box-shadow:
    3px 3px 3px rgba(0, 0, 0, 0.2),
    0px 0px 6px rgba(0, 0, 0, 0.2);
  -o-box-shadow:
    3px 3px 3px rgba(0, 0, 0, 0.2),
    0px 0px 6px rgba(0, 0, 0, 0.2);
  box-shadow:
    3px 3px 3px rgba(0, 0, 0, 0.2),
    0px 0px 6px rgba(0, 0, 0, 0.2);
}

#note-list:before {
  content: '';
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 140px;
  height: 100%;
  width: 1px;
  background: #db4034;
}

#note-list header {
  height: 150px;
  width: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
}

#note-list header h2 {
  font-size: 60px;
  line-height: 60px;
  padding: 75px 20px 0 160px;
}

.note {
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 0.3px;
}

.note p {
  margin: 0px;
}

ul.note-content li {
  margin-bottom: 3px;
}

#input-area {
  padding: 60px 0px 5px 0px;
}

#note-list header h2 {
  font-size: 60px;
  line-height: 60px;
  padding: 75px 20px 0 160px;
  z-index: 2;
}
</style>

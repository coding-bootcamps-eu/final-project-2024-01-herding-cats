<template>
  <div class="container">
    <header>
      <h2 class="title2">Notes</h2>
    </header>
    <textarea
      v-model="newNotes"
      id="note-input"
      placeholder="Take notes for your trip ..."
      @keydown.enter="addNote"
    ></textarea>

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
.container {
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

.container:before {
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

.container header {
  height: 10px;
  width: 100%;
  background: white;
  position: absolute;
  margin-top: 2rem;
  top: 0;
  left: 0;
}

#note-input {
  width: calc(100% - 200px);
  margin: 0 auto;
  position: relative;
  top: -60px;
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
  margin-bottom: 30px;
  list-style-type: disc;
  position: relative;
}

.title2 {
  font-family: 'Satoshi-Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 3.2rem;
  line-height: 4.3rem;
  text-align: center;
  color: #0a0a0a;
  text-shadow: 0px 0.2rem 0.2rem rgba(255, 255, 255, 0.25);
  margin-bottom: 3rem;
}

.delete-btn {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  position: absolute;
  left: -1.3em;
  top: 80%;
  transform: translateY(-90%);
  line-height: 0.5px;
}
</style>

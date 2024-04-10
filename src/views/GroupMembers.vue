<template>
  <form>
    <div id="form">
      <h3>Group members</h3>
      <div class="list">
        <ul>
          <li v-for="(groupmember, index) in groupmembers" :key="index">
            {{ groupmember.name }} - {{ groupmember.isAdmin ? 'Admin' : 'Participant' }}
            <button @click="deleteMember(index)">x</button>

            <ul>
              <li>{{ groupmember.startDate }}/{{ groupmember.endDate }} <br /></li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="addMember">
        <div class="inputtext">
          <label for="name">Name:</label>
          <input v-model="newMember.name" placeholder="e. g. Max Mustermann" />
        </div>
        <div class="inputtext">
          <label for="start">Start of travel:</label>
          <input type="date" id="start" v-model="newMember.startDate" />

          <label for="end">End of travel:</label>
          <input type="date" id="end" v-model="newMember.endDate" />
        </div>
        <div class="admin">
          <input type="checkbox" v-model="newMember.isAdmin" />
          <label>Admin</label>
        </div>
        <button @click.prevent="addMember">Add group member</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newMember: {
        name: '',
        startDate: '',
        endDate: '',
        isAdmin: false
      },
      groupmembers: []
    }
  },
  methods: {
    addMember() {
      if (this.newMember.name.trim() !== '') {
        this.groupmembers.push({ ...this.newMember })
        this.newMember.name = ''
        this.newMember.startDate = ''
        this.newMember.endDate = ''
        this.newMember.isAdmin = false
      } else {
        alert('Enter the name of the participant')
      }
    },
    deleteMember(index) {
      this.groupmembers.splice(index, 1)
    }
  }
}
</script>

<style>
.addMember {
  border-top: 2px solid grey;
  padding-top: 10px;
}

.list {
  padding-bottom: 10px;
}

.inputtext input {
  margin-bottom: 10px;
  display: block;
}

.admin input {
  margin-right: 5px;
}

li li {
  list-style-type: none;
}
</style>

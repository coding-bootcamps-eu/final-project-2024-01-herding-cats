<template>
  <form>
    <div id="form" class="container">
      <h3>Group members</h3>
      <div class="list">
        <ul>
          <li v-for="(groupmember, index) in groupmembers" :key="index">
            <router-link :to="{ name: 'profile', params: { id: groupmember.id } }">
              {{ groupmember.name }} - {{ groupmember.isAdmin ? 'Admin' : 'Participant' }}
            </router-link>
            <button @click="deleteMember(index)">x</button>
            <ul>
              <li>{{ groupmember.startDate }}/{{ groupmember.endDate }} <br /></li>
            </ul>
          </li>
        </ul>
      </div>

      <InputForm :item-name="itemName" />
    </div>
  </form>
</template>

<script>
import InputForm from '@/components/InputForm.vue'

export default {
  data() {
    return {
      itemName: 'Group Member',
      newMember: {
        name: '',
        startDate: '',
        endDate: '',
        isAdmin: false,
        id: 1
      },
      groupmembers: []
    }
  },
  created() {
    this.memberId = this.$route.params.id
  },

  components: {
    InputForm
  },

  methods: {
    addMember() {
      if (this.newMember.name.trim() === '') {
        alert('Enter the name of the participant')
      } else {
        this.groupmembers.push({ ...this.newMember })
        this.newMember.id = Math.floor(Math.random() * 1000000).toString()
        this.newMember.name = ''
        this.newMember.startDate = ''
        this.newMember.endDate = ''
        this.newMember.isAdmin = false
      }
    },

    deleteMember(index) {
      this.groupmembers.splice(index, 1)
    },
    goToProfile(id) {
      this.$router.push({ name: 'profile', params: { id } })
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

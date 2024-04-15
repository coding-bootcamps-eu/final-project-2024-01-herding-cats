<template>
  <form>
    <div id="form" class="container">
      <h3>Group members</h3>
      <div class="list">
        <ul>
          <li v-for="(groupMember, index) in groupMembers" :key="index">
            <router-link :to="{ name: 'profile', params: { id: groupMember.id } }">
              {{ groupMember.name }} - {{ groupMember.isAdmin ? 'Admin' : 'Participant' }}
            </router-link>
            <button @click="deleteMember(index)">x</button>
            <ul>
              <li v-if="lodging.startDate">From: {{ groupMember.startDate }}</li>
              <li v-if="lodging.endDate">Until: {{ groupMember.endDate }}</li>
            </ul>
          </li>
        </ul>
      </div>

      <InputForm @clickAdd="getFromChild" :item-name="itemName" :placeholder="placeholder" />
    </div>
  </form>
</template>

<script>
import InputForm from '@/components/InputForm.vue'

export default {
  data() {
    return {
      itemName: 'Group Member',
      placeholder: 'e. g. Max Mustermann',
      groupMembers: []
    }
  },
  created() {
    this.memberId = this.$route.params.id
  },

  components: {
    InputForm
  },

  methods: {
    deleteMember(index) {
      this.groupMembers.splice(index, 1)
    },
    goToProfile(id) {
      this.$router.push({ name: 'profile', params: { id } })
    },
    getFromChild(data) {
      this.groupMembers = data
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

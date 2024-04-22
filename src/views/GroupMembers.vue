<template>
  <form>
    <div id="form" class="container">
      <h3>Group Members</h3>
      <div class="list">
        <ul>
          <!-- render admins that created the trip, 
            so that they don't have to manually add themselves. 
            because they are stored in /users and not in /events, 
            they are currently non interactable
          -->
          <li v-for="(groupMember, index) in filteredUsers" :key="index">
            <!-- <router-link :to="{ name: 'profile', params: { index } }"> -->
            {{ groupMember.name }} -
            {{
              this.adminsEntries.some((item) => item.userId === groupMember.id)
                ? 'Admin'
                : 'Participant'
            }}
            <!-- </router-link> -->
            <ul>
              <li v-if="groupMember.startDate">From: {{ groupMember.startDate }}</li>
              <li v-if="groupMember.endDate">Until: {{ groupMember.endDate }}</li>
            </ul>
            <!-- <button @click="deleteMember(index)">x</button> -->
          </li>

          <!-- render group members that were manually added -->
          <li v-for="(groupMember, index) in this.groupmembersEntries" :key="index">
            <router-link :to="{ name: 'profile', params: { index: groupMember.id } }">
              {{ groupMember.name }} - {{ groupMember.isAdmin ? 'Admin' : 'Participant' }}
            </router-link>
            <ul>
              <li v-if="groupMember.startDate">From: {{ groupMember.startDate }}</li>
              <li v-if="groupMember.endDate">Until: {{ groupMember.endDate }}</li>
            </ul>
            <button @click="deleteMember(index)">x</button>
          </li>
        </ul>
      </div>

      <InputForm @clickAdd="getFromChild" :item-name="itemName" :placeholder="placeholder" />
    </div>
  </form>
  <router-link :to="{ path: '/trip/' + this.$route.params.id }"
    ><button>Back to Trip</button></router-link
  >
</template>

<script>
import InputForm from '@/components/InputForm.vue'
import { herdingCatsstore } from '@/stores/counter.js'

export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      state: herdingCatsstore(),
      itemName: 'Group Member',
      placeholder: 'e.g. Max Mustermann'
    }
  },
  created() {
    this.state.loadTripData(this.$route.params.id)
    this.state.loadUserData()
  },
  computed: {
    // filter out users that were loaded in via loadUserData()
    // but that don't participate in the trip
    filteredUsers() {
      // Destructure userData from state
      const { userData } = this.state
      //prevents errors when loadUserData() malfunctions
      if (!userData || !this.$route.params.id) {
        return []
      }

      return userData.filter((user) => user.trips.includes(this.$route.params.id))
    },

    groupmembersEntries() {
      if (this.state.tripData.length > 0) {
        if (this.state.tripData[0].details) {
          return this.state.tripData[0].details.groupmembers
        }
        return []
      } else {
        return []
      }
    },

    adminsEntries() {
      if (this.state.tripData.length > 0) {
        if (this.state.tripData[0].details) {
          return this.state.tripData[0].admins
        }
        return []
      } else {
        return []
      }
    }
  },
  components: {
    InputForm
  },

  methods: {
    async deleteMember(index) {
      this.state.tripData[0].details.groupmembers.splice(index, 1)
      await fetch(`${this.tripApiUrl}/${this.$route.params.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.tripData[0])
      })
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

<style scoped>
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

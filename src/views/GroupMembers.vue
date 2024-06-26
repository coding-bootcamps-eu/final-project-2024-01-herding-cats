<template>
  <header>
    <img src="@/assets/cat-logo/cat-logo-small.svg" alt="Herding Cats Logo" />
  </header>
  <form>
    <div id="form" class="container">
      <h2 class="title">Group Members</h2>
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
            <button v-if="isUserThere" class="delete-btn" @click="deleteMember(index)">x</button>
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
      isUserThere: false,
      tripApiUrl: 'http://localhost:3000/events',
      state: herdingCatsstore(),
      itemName: 'Group Member',
      placeholder: 'e.g. Max Mustermann'
    }
  },
  created() {
    this.state.loadTripData(this.$route.params.id)
    this.state.loadUserData()
    this.checkUser()
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
          console.log(this.state.tripData[0].admins)
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
    async checkUser() {
      console.log(this.state.user)
      if (this.state.user === null || Object.keys(this.state.user).length === 0) {
        this.isUserThere = false
      } else {
        this.isUserThere = true
      }
    },

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

li + li {
  margin-top: 2rem;
}

li ul li + li {
  margin-top: 0;
}

ul li {
  font-family: 'Satoshi-Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  color: #000000;
}

.container {
  background-color: var(--turqoise-gray-background);
}
</style>

<template>
  <h2>Activities</h2>
  <main class="container">
    <ul>
      <li class="activity-entry" v-for="(activity, index) of activityEntries" :key="index">
        <h3>{{ activity.name }}</h3>
        <ul>
          <li>{{ activity.zipcode }} {{ activity.city }}</li>
          <li>{{ activity.address }}</li>
          <li v-if="activity.startDate">From: {{ activity.startDate }}</li>
          <li v-if="activity.endDate">Until: {{ activity.endDate }}</li>
          <br />
          <li v-if="activity.notes">Notes: {{ activity.notes }}</li>
        </ul>
        <EditButton
          @clickAdd="getFromChild"
          :item-name="itemName"
          :begin-name="beginName"
          :end-name="endName"
          :placeholder="placeholder"
          :nameValue="activity.name"
          :zipcodeValue="activity.zipcode"
          :cityValue="activity.city"
          :addressValue="activity.address"
          :startDateValue="activity.startDate"
          :endDateValue="activity.endDate"
          :notesValue="activity.notes"
          :idValue="activity.id"
        />
        <button class="delete-btn" @click="deleteItem(index)">x</button>
      </li>
    </ul>
    <InputForm
      @clickAdd="getFromChild"
      :item-name="itemName"
      :begin-name="beginName"
      :end-name="endName"
      :placeholder="placeholder"
    />
  </main>
</template>

<style scoped>
.activity-entry {
  margin: 0 auto;
  text-align: center;
  max-width: 60%;
}

.activity-entry + .activity-entry {
  border-top: 0.25rem solid black;
  margin-top: 2rem;
  padding-top: 1rem;
}
</style>

<script>
import EditButton from '@/components/EditButton.vue'
import InputForm from '@/components/InputForm.vue'
import { herdingCatsstore } from '@/stores/counter.js'
export default {
  data() {
    return {
      tripApiUrl: 'http://localhost:3000/events',
      state: herdingCatsstore(),
      itemName: 'Activity',
      placeholder: 'e.g. Museum'
    }
  },
  components: {
    InputForm,
    EditButton
  },
  computed: {
    activityEntries() {
      if (this.state.tripData.length > 0) {
        if (this.state.tripData[0].details) {
          return this.state.tripData[0].details.activity
        }
        return []
      } else {
        return []
      }
    }
  },
  methods: {
    getFromChild(data) {
      this.transportList = data
    },
    async deleteItem(index) {
      this.state.tripData[0].details.activity.splice(index, 1)
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
  }
}
</script>

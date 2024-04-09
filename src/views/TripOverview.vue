<template>
  <h2>Trip.name</h2>
  <ToggleSwitch labelText="This trip is Public" />
  <section class="overview">Click "Add Item" to start Herding your Cats</section>
  <nav>
    <a href="">View Timeline</a>
  </nav>
  <button>Add Item</button>
  <section id="trip-id">
    <p>Trip ID:111111</p>
    <button>Copy ID to Clipboard</button>
  </section>
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
export default {
  components: {
    ToggleSwitch
  }
}
</script>

<style scoped>
#trip-id {
  display: flex;
}
.overview {
  margin: 1rem;
  min-height: 10rem;
  background-color: blanchedalmond;
}
</style>

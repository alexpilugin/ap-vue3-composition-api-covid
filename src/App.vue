<template>
  <div class="app-wrapper">
    <Navbar title="Covid-19 Tracker" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
.app-wrapper {
  box-sizing: border-box;
  max-width: 100%;
}
</style>
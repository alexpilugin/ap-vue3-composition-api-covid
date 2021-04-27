<template>
  <div class="header">
    <router-link to="/">{{ title }}</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },  
}
</script>

<style scoped>
.header {
  background-color: #aaa;
  overflow: hidden;
  margin: 0;
}
.header > * {
  float: left;
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 1.4rem;
}
</style>
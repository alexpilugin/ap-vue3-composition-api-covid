<template>
  <div class="about-page">
    <div class="row">
      <h1>About Page</h1>
      <br />
      <p>
        This web app created by <a href="https://github.com/alexpilugin">Alex Pilugin</a> and uses
        <a href="https://v3.vuejs.org">Vue.js version 3</a> with Composition
        API, <a href="https://next.vuex.vuejs.org">Vuex.js version 4</a>,
        <a href="https://vitejs.dev/guide/">Vite.js</a>
      </p>
      <p>
        This application fetches data from
        <a href="https://covid19api.com">COVID 19 API</a><br />
        Also this web app uses
        <a href="https://momentjs.com">Moment.js for Date formating</a> and
        <a href="https://github.com/smithalan92/vue3-highcharts"
          >vue3-highcharts</a
        >
        - a wrapper for <a href="https://www.highcharts.com/">Highcharts</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.row {
  width: auto;
}
a {
  text-decoration: none;
}
</style>
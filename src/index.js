import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/store.js' // Vuex
import { router } from './router/router.js' // VueRouter
import VueHighcharts from 'vue3-highcharts'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueHighcharts)

app.mount('#app')
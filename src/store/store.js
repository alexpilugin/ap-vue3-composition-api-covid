import { createStore } from 'vuex'
import { covid } from './covid.js'

export const store = createStore({
  modules: {
    covid
  }
})

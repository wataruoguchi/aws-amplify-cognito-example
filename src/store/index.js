import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    user,
  }
})

export default store

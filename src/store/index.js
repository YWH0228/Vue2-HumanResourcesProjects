import Vue from "vue"
import Vuex from "vuex"
import p from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [p()],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})

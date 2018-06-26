import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 1,
    userName: 'djh',
    activity: null
  },
  getters: {
  },
  mutations,
  actions
})

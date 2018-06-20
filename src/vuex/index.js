import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    activity: null
  },
  getters: {
    getToken: state => {
      return state.token
    }
  },
  mutations,
  actions
})

import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {

  },
});

export function setupStore() {
  store.dispatch('user/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}
export default store

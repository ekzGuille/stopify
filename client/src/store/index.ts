import Vue from 'vue';
import Vuex from 'vuex';
import credentials from './credentials';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userCredentials: {
      namespaced: true,
      ...credentials,
    },
  },
});

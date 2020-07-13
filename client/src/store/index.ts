import Vue from 'vue';
import Vuex from 'vuex';
import _credentials from './credentials';
import _user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    credentials: {
      namespaced: true,
      ..._credentials,
    },
    user: {
      namespaced: true,
      ..._user,
    },
  },
});

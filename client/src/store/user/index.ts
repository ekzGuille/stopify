import { ActionContext } from 'vuex';
import { VuexStateUser } from '@/utils/types';

const state = {
  accessToken: localStorage.getItem('user_information') || '',
};

const getters = {
  getUserInformation: (state: VuexStateUser) => state.userInformation,
};

const actions = {
  storeUserInformation({ commit }: ActionContext<VuexStateUser, any>, accessToken: string) {
    commit('setAccessToken', accessToken);
  },
};

const mutations = {
  setUserInformation: (state: VuexStateUser, userInformation: string) => {
    state.userInformation = userInformation;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

interface VuexStateCredential {
  userInformation: string; // TODO: No sera string sino la interfaz con los datos de la API de Spotify
}

interface VuexCommit {
  commit: any;
}

const state = {
  accessToken: localStorage.getItem('user_information') || '',
};

const getters = {
  getUserInformation: (state: VuexStateCredential) => state.userInformation,
};

const actions = {
  storeUserInformation({ commit }: VuexCommit, accessToken: string) {
    commit('setAccessToken', accessToken);
  },
};

const mutations = {
  setUserInformation: (state: VuexStateCredential, userInformation: string) => {
    state.userInformation = userInformation;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

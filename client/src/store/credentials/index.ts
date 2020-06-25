interface VuexStateCredential {
  accessToken: string;
  refreshToken: string;
  isLogged: boolean;
}

interface VuexCommit {
  commit: any;
}

const state = {
  accessToken: localStorage.getItem('access_token') || '',
  refreshToken: localStorage.getItem('refresh_token') || '',
  isLogged: false,
};

const getters = {
  getAccessToken: (state: VuexStateCredential) => state.accessToken,
  getRefreshToken: (state: VuexStateCredential) => state.refreshToken,
  getIsLogged: (state: VuexStateCredential) => state.isLogged,
};

const actions = {
  storeAccessToken({ commit }: VuexCommit, accessToken: string) {
    commit('setAccessToken', accessToken);
  },
  storeRefreshToken({ commit }: VuexCommit, refreshToken: string) {
    commit('setRefreshToken', refreshToken);
  },
  storeIsLoged({ commit }: VuexCommit, isLogged: string) {
    commit('setLogged', isLogged);
  },
};

const mutations = {
  setAccessToken: (state: VuexStateCredential, accessToken: string) => { state.accessToken = accessToken; },
  setRefreshToken: (state: VuexStateCredential, refreshToken: string) => { state.refreshToken = refreshToken; },
  setLogged: (state: VuexStateCredential, isLogged: boolean) => { state.isLogged = isLogged; },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

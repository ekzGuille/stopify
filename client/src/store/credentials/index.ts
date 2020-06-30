import { getUrlData } from '@/utils';
import Constants from '@/utils/constants';
import BACKEND_URL from '@/api';

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
  isLogged: !!localStorage.getItem('access_token')
    || !!localStorage.getItem('login_error') || false,
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
  storeIsLogged({ commit }: VuexCommit, isLogged: boolean) {
    commit('setLogged', isLogged);
  },
  storeLocalData({ commit }: VuexCommit, { accessToken, refreshToken, loginError }:
    { accessToken?: string; refreshToken?: string; loginError?: string }) {
    let loginChecker = null;
    if (accessToken) {
      loginChecker = getUrlData(accessToken);
      commit('setAccessToken', getUrlData(accessToken));
    }
    if (refreshToken) {
      commit('setRefreshToken', getUrlData(refreshToken));
    }
    if (loginError) {
      const isLogged = getUrlData(loginError) || !!loginChecker;
      commit('setLogged', isLogged);
    }
  },
  logIn() {
    window.location.href = `${BACKEND_URL}/login`;
  },
  logOut({ commit }: VuexCommit) {
    localStorage.removeItem(Constants.accessToken);
    localStorage.removeItem(Constants.refreshToken);
    localStorage.removeItem(Constants.loginError);
    commit('logOut');
  },
};

const mutations = {
  setAccessToken: (state: VuexStateCredential, accessToken: string) => { state.accessToken = accessToken; },
  setRefreshToken: (state: VuexStateCredential, refreshToken: string) => { state.refreshToken = refreshToken; },
  setLogged: (state: VuexStateCredential, isLogged: boolean) => { state.isLogged = isLogged; },
  logOut: (state: VuexStateCredential) => {
    state.accessToken = '';
    state.refreshToken = '';
    state.isLogged = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios, { AxiosResponse } from 'axios';
import { getUrlData } from '@/utils/functions';
import Constants from '@/utils/constants';
import BACKEND_URL from '@/api';
import env from '@/config';
import { ActionContext } from 'vuex';
import { VuexLocalStorage, VuexStateCredential } from '@/utils/types';

const state = {
  accessToken: localStorage.getItem(Constants.accessToken) || '',
  refreshToken: localStorage.getItem(Constants.refreshToken) || '',
  isLogged: !!localStorage.getItem(Constants.accessToken) || false,
  expiresIn: localStorage.getItem(Constants.expiresIn) || 3600,
  lastRefresh: localStorage.getItem(Constants.lastTokenRefresh) || Date.now(),
};

const getters = {};

const actions = {
  storeLocalData({ commit }: ActionContext<VuexStateCredential, any>, {
    accessToken, refreshToken, loginError, expiresIn, lastRefresh,
  }: VuexLocalStorage) {
    let loginChecker = null;
    let isLogged = null;
    if (accessToken) {
      loginChecker = getUrlData(accessToken);
      commit('setAccessToken', getUrlData(accessToken));
    }
    if (refreshToken) {
      commit('setRefreshToken', getUrlData(refreshToken));
    }
    if (loginError) {
      isLogged = !getUrlData(loginError) || !!loginChecker;
      commit('setLogged', isLogged);
    }
    if (expiresIn) {
      commit('setExpires', +getUrlData(expiresIn));
    }
    if (lastRefresh) {
      const dateToStore = Date.now();
      if (isLogged) {
        localStorage.setItem(lastRefresh, `${dateToStore}`);
        commit('setLastRefresh', dateToStore);
      }
    }
  },
  logIn() {
    window.location.href = `${BACKEND_URL}/login`;
  },
  logOut({ commit }: ActionContext<VuexStateCredential, any>) {
    localStorage.removeItem(Constants.accessToken);
    localStorage.removeItem(Constants.refreshToken);
    localStorage.removeItem(Constants.loginError);
    localStorage.removeItem(Constants.expiresIn);
    localStorage.removeItem(Constants.lastTokenRefresh);
    commit('logOut');
  },
  async updateAccessToken({ commit, state }: ActionContext<VuexStateCredential, any>) {
    if (state.lastRefresh + state.expiresIn < Date.now()) {
      try {
        const { data: { access_token } } = await axios
          .get(`${BACKEND_URL}/refresh_token${new URLSearchParams({ refresh_token: state.refreshToken })}`);
        commit('setAccessToken', access_token);
        commit('setLastRefresh', Date.now());
      } catch (e) {
        console.error(process.env.NODE_ENV === 'production' ? 'Cannot refresh user\'s token' : e);
      }
    }
  },
};
const mutations = {
  setAccessToken: (state: VuexStateCredential, accessToken: string) => {
    state.accessToken = accessToken;
  },
  setRefreshToken: (state: VuexStateCredential, refreshToken: string) => {
    state.refreshToken = refreshToken;
  },
  setLogged: (state: VuexStateCredential, isLogged: boolean) => {
    state.isLogged = isLogged;
  },
  setExpires: (state: VuexStateCredential, expiresIn: number) => {
    state.expiresIn = expiresIn;
  },
  setLastRefresh: (state: VuexStateCredential, lastRefresh: number) => {
    state.lastRefresh = lastRefresh;
  },
  logOut: (state: VuexStateCredential) => {
    state.accessToken = '';
    state.refreshToken = '';
    state.isLogged = false;
    state.expiresIn = 3600;
    state.lastRefresh = Date.now();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

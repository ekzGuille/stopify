import axios, { AxiosResponse } from 'axios';
import { getUrlData, getTime } from '@/utils/functions';
import { UserCredentials, UserData } from '@/utils/constants';
import BACKEND_URL from '@/api';
import env from '@/config';
import { ActionContext } from 'vuex';
import { VuexLocalStorage, VuexStateCredential } from '@/types/vuex';

const state: VuexStateCredential = {
  accessToken: localStorage.getItem(UserCredentials.accessToken) || '',
  refreshToken: localStorage.getItem(UserCredentials.refreshToken) || '',
  isLogged: !!localStorage.getItem(UserCredentials.accessToken) || false,
  expiresIn: +(localStorage.getItem(UserCredentials.expiresIn) || 3600),
  lastRefresh: +(localStorage.getItem(UserCredentials.lastTokenRefresh) || getTime()),
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
      const dateToStore = getTime();
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
    localStorage.removeItem(UserCredentials.accessToken);
    localStorage.removeItem(UserCredentials.refreshToken);
    localStorage.removeItem(UserCredentials.loginError);
    localStorage.removeItem(UserCredentials.expiresIn);
    localStorage.removeItem(UserCredentials.lastTokenRefresh);
    localStorage.removeItem(UserData.profileData);
    commit('logOut');
  },
  async updateAccessToken({ commit, state }: ActionContext<VuexStateCredential, any>) {
    if (state.lastRefresh + state.expiresIn < getTime()) {
      try {
        const { data: { access_token } }: AxiosResponse = await axios
          .get(`${BACKEND_URL}/refresh_token?${new URLSearchParams({ refresh_token: state.refreshToken })}`);
        commit('setAccessToken', access_token);
        localStorage.setItem(UserCredentials.accessToken, access_token);
        const newDate = getTime();
        localStorage.setItem(UserCredentials.lastTokenRefresh, `${newDate}`);
        commit('setLastRefresh', newDate);
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
    state.lastRefresh = getTime();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

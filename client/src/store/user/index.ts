import axios, { AxiosResponse } from 'axios';
import { ActionContext } from 'vuex';
import { VuexStateUser } from '@/types/vuex';
import credentialsStore from '@/store/credentials';
import env from '@/config';
import { SPUserProfile, UserProfile } from '@/types/spotify';
import { UserData } from '@/utils/constants';

const { state: credentialsState } = credentialsStore;

const state: VuexStateUser = {
  userInformation: localStorage.getItem(UserData.profileData) || '',
};

const getters = {
  getUserInformation: (state: VuexStateUser) => {
    let _userInfo;
    if (state.userInformation) {
      try {
        _userInfo = JSON.parse(state.userInformation) as UserProfile;
      } catch (e) {
        console.error(process.env.NODE_ENV === 'production' ? 'Malformed JSON' : e);
      }
    }
    return _userInfo;
  },
};

const actions = {
  async queryUserInformation({ commit, dispatch }: ActionContext<VuexStateUser, any>) {
    try {
      const { data }: AxiosResponse<SPUserProfile> = await axios.get(`${env.VUE_APP_SPOTIFY_API_ENDPOINT}/v1/me`, {
        headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
      });
      await dispatch('saveUserProfile', data);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s profile' : e);
    }
  },
  saveUserProfile({ commit }: ActionContext<VuexStateUser, any>, data: SPUserProfile) {
    const { display_name, images } = data;
    const dataToStore = JSON.stringify({
      display_name,
      image: images.length ? images[0].url : '',
    });
    localStorage.setItem(UserData.profileData, dataToStore);
    commit('setUserInformation', dataToStore);
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

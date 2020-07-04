import axios, { AxiosResponse } from 'axios';
import { ActionContext } from 'vuex';
import { VuexStateUser } from '@/types/vuex';
import credentialsStore from '@/store/credentials';
import env from '@/config';
import { SPUserProfile, UserProfile } from '@/types/spotify';
import { UserData } from '@/utils/constants';

const { state: credentialsState } = credentialsStore;

const API_SPOTIFY = env.VUE_APP_SPOTIFY_API_ENDPOINT || 'https://api.spotify.com';

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
      const { data }: AxiosResponse<SPUserProfile> = await axios.get(`${API_SPOTIFY}/v1/me`, {
        headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
      });
      await dispatch('saveUserProfile', data);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s profile' : e);
    }
  },
  saveUserProfile({ commit }: ActionContext<VuexStateUser, any>, data: SPUserProfile) {
    const {
      display_name, images, id, followers, product, external_urls, country,
    } = data;
    const payloadData: UserProfile = {
      id,
      display_name,
      image: images.length ? images[0].url : '',
      country,
      followersCount: followers.total,
      product,
      spotifyProfileUrl: external_urls.spotify,
    };
    const dataToStore = JSON.stringify(payloadData);
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

import axios, { AxiosResponse } from 'axios';
import { ActionContext } from 'vuex';
import { VuexStateUser, QueryPlaylistAttributes } from '@/types/vuex';
import credentialsStore from '@/store/credentials';
import env from '@/config';
import {
  SPUserProfile, UserProfile, SPUserPlaylist, UserPlaylist, SPItem,
} from '@/types/spotify';
import { UserData } from '@/utils/constants';

const { state: credentialsState } = credentialsStore;

const API_SPOTIFY = env.VUE_APP_SPOTIFY_API_ENDPOINT || 'https://api.spotify.com';

const state: VuexStateUser = {
  userInformation: localStorage.getItem(UserData.profileData)
    ? JSON.parse(localStorage.getItem(UserData.profileData) || '{}') : null,
  userPlaylists: null,
};

const getters = {
  getUserInformation: (state: VuexStateUser) => state.userInformation,

  getUserPlaylists: (state: VuexStateUser) => state.userPlaylists,
};

const actions = {
  async queryUserInformation({ commit, dispatch }: ActionContext<VuexStateUser, any>) {
    try {
      const { data }: AxiosResponse<SPUserProfile> = await axios.get(`${API_SPOTIFY}/v1/me`, {
        headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
      });

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

      localStorage.setItem(UserData.profileData, JSON.stringify(payloadData));
      commit('setUserInformation', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s profile' : e);
    }
  },
  async queryUserPlaylists({ commit, dispatch, state }: ActionContext<VuexStateUser, any>,
    { userId, queryOffset }: QueryPlaylistAttributes) {
    const storedPlaylists = state.userPlaylists ? state.userPlaylists.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SPUserPlaylist> = await axios
        .get(`${API_SPOTIFY}/v1/users/${userId}/playlists?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: UserPlaylist = {
        limit,
        total,
        offset,
        items: [...storedPlaylists, ...items.map((i: SPItem) => ({
          id: i.id,
          name: i.name,
          public: i.public,
          trackCount: i.tracks.total,
          url: i.external_urls.spotify,
          image: i.images[0],
        }))],
      };

      commit('setUserPlaylists', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s playlists' : e);
    }
  },
};

const mutations = {
  setUserInformation: (state: VuexStateUser, userInformation: UserProfile) => {
    state.userInformation = userInformation;
  },
  setUserPlaylists: (state: VuexStateUser, userPlaylists: UserPlaylist) => {
    state.userPlaylists = userPlaylists;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

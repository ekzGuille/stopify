import axios, { AxiosResponse } from 'axios';
import { ActionContext } from 'vuex';
import { VuexStateUser, QueryAPI, QueryTopResources } from '@/types/vuex';
import credentialsStore from '@/store/credentials';
import env from '@/config';
import {
  SpotifyUserProfile, SpotifyUserPlaylist, SpotifyPlaylistItem, SpotifySavedTrackItem,
} from '@/types/spotify';
import {
  UserPlaylist,
  UserProfile,
  UserSavedTracks,
  UserTopAlbums,
  UserTopTracks,
} from '@/types/custom';
import { UserData } from '@/utils/constants';

const { state: credentialsState } = credentialsStore;

const API_SPOTIFY = env.VUE_APP_SPOTIFY_API_ENDPOINT || 'https://api.spotify.com';

const state: VuexStateUser = {
  userInformation: localStorage.getItem(UserData.profileData)
    ? JSON.parse(localStorage.getItem(UserData.profileData) || '{}') : null,
  userPlaylists: null,
  userSavedTracks: null,
  userTopResources: null,
};

const getters = {
  getUserInformation: (state: VuexStateUser) => state.userInformation,
  getUserPlaylists: (state: VuexStateUser) => state.userPlaylists,
  setUserSavedTracks: (state: VuexStateUser) => state.userSavedTracks,
  setUserTopResources: (state: VuexStateUser) => state.userTopResources,
};

const actions = {
  async queryUserInformation({ commit }: ActionContext<VuexStateUser, any>) {
    try {
      const { data }: AxiosResponse<SpotifyUserProfile> = await axios.get(`${API_SPOTIFY}/v1/me`, {
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
    { queryOffset }: QueryAPI) {
    const storedPlaylists = state.userPlaylists ? state.userPlaylists.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SpotifyUserPlaylist> = await axios
        .get(`${API_SPOTIFY}/v1/me/playlists?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: UserPlaylist = {
        limit,
        total,
        offset,
        items: [...storedPlaylists, ...items.map((item: SpotifyPlaylistItem) => ({
          id: item.id,
          name: item.name,
          public: item.public,
          trackCount: item.tracks.total,
          url: item.external_urls.spotify,
          image: item.images[0],
        }))],
      };

      commit('setUserPlaylists', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s playlists' : e);
    }
  },
  async queryUserSavedTracks({ commit, dispatch, state }: ActionContext<VuexStateUser, any>,
    { queryOffset }: QueryAPI) {
    const storedSavedTracks = state.userSavedTracks ? state.userSavedTracks.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SpotifyUserPlaylist> = await axios
        .get(`${API_SPOTIFY}/me/tracks?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: any | UserSavedTracks = {
        limit,
        total,
        offset,
        /* items: [...storedSavedTracks, ...items.map((item: SpotifySavedTrackItem) => ({

        }))], */
      };

      commit('setUserSavedTracks', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s playlists' : e);
    }
  },
  async queryUserTopResources({ commit, dispatch, state }: ActionContext<VuexStateUser, any>,
    { queryOffset, type }: QueryTopResources) {
    const storedTopResources = state.userTopResources ? state.userTopResources.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SpotifyUserPlaylist> = await axios
        .get(`${API_SPOTIFY}/me/top/${type}?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: any | UserTopTracks | UserTopAlbums = {
        limit,
        total,
        offset,
        /* items: [...storedTopResources, ...items.map((item: SpotifySavedTrackItem) => ({

        }))], */
      };

      commit('setUserTopResources', payloadData);
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
  setUserSavedTracks: (state: VuexStateUser, userSavedTracks: UserSavedTracks) => {
    state.userSavedTracks = userSavedTracks;
  },
  setUserTopResources: (state: VuexStateUser, userTopResources: UserTopAlbums | UserTopTracks) => {
    state.userTopResources = userTopResources;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

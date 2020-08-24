import axios, { AxiosResponse } from 'axios';
import { ActionContext } from 'vuex';
import { VuexStateUser, QueryAPI, QueryTopResources } from '@/types/vuex';
import credentialsStore from '@/store/credentials';
import env from '@/config';
import {
  SpotifyUserProfile,
  SpotifyUserPlaylist,
  SpotifyPlaylistItem,
  SpotifyTopTracks,
  SpotifyTrackItem,
  SpotifyTopArtists,
  SpotifySavedTrackItem, SpotifySavedTracks, SpotifyArtist,
} from '@/types/spotify';
import {
  TrackItem,
  UserPlaylist,
  UserProfile,
  UserSavedTracks,
  UserTopArtists,
  UserTopTracks,
} from '@/types/custom';
import { UserData } from '@/utils/constants';

const { state: credentialsState } = credentialsStore;

const API_SPOTIFY = env.VUE_APP_SPOTIFY_API_ENDPOINT || 'https://api.spotify.com';

export function mapTrack(track: SpotifyTrackItem): TrackItem {
  return {
    album: track.album,
    artists: track.artists,
    duration_ms: track.duration_ms,
    url: track.external_urls.spotify,
    id: track.id,
    name: track.name,
    popularity: track.popularity,
    preview_url: track.preview_url,
    track_number: track.track_number,
    image: track.album.images[0],
  };
}

const state: VuexStateUser = {
  userInformation: localStorage.getItem(UserData.profileData)
    ? JSON.parse(localStorage.getItem(UserData.profileData) || '{}') : null,
  userPlaylists: null,
  userSavedTracks: null,
  userTopArtists: null,
  userTopTracks: null,
};

const getters = {
  getUserInformation: (state: VuexStateUser) => state.userInformation,
  getUserPlaylists: (state: VuexStateUser) => state.userPlaylists,
  getUserSavedTracks: (state: VuexStateUser) => state.userSavedTracks,
  getUserTopArtists: (state: VuexStateUser) => state.userTopArtists,
  getUserTopTracks: (state: VuexStateUser) => state.userTopTracks,
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
      const { data }: AxiosResponse<SpotifySavedTracks> = await axios
        .get(`${API_SPOTIFY}/v1/me/tracks?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: UserSavedTracks = {
        limit,
        total,
        offset,
        items: [...storedSavedTracks, ...items.map((item: SpotifySavedTrackItem) => ({
          added_at: item.added_at,
          ...mapTrack(item.track),
        }))],
      };

      commit('setUserSavedTracks', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s saved tracks' : e);
    }
  },
  async queryUserTopTracks({ commit, dispatch, state }: ActionContext<VuexStateUser, any>,
    { queryOffset, type }: QueryTopResources) {
    const storedTopTracks = state.userTopTracks ? state.userTopTracks.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SpotifyTopTracks> = await axios
        .get(`${API_SPOTIFY}/v1/me/top/${type}?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: UserTopTracks = {
        limit,
        total,
        offset,
        items: [...storedTopTracks, ...items.map(mapTrack)],
      };

      commit('setUserTopTracks', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s top tracks' : e);
    }
  },
  async queryUserTopArtist({ commit, dispatch, state }: ActionContext<VuexStateUser, any>,
    { queryOffset, type }: QueryTopResources) {
    const storedTopArtists = state.userTopArtists ? state.userTopArtists.items : [];

    try {
      // Mostrar las últimas 10 añadidas
      const queryStringData = {
        limit: '10',
        offset: `${queryOffset || 0}`,
      };
      const { data }: AxiosResponse<SpotifyTopArtists> = await axios
        .get(`${API_SPOTIFY}/me/top/${type}?${new URLSearchParams(queryStringData).toString()}`, {
          headers: { Authorization: `Bearer ${credentialsState.accessToken}` },
        });

      const {
        limit, total, items, offset,
      } = data;

      const payloadData: UserTopArtists = {
        limit,
        total,
        offset,
        items: [...storedTopArtists, ...items.map((item: SpotifyArtist) => ({
          followers: item.followers,
          genres: item.genres,
          href: item.href,
          id: item.id,
          image: item.images[0],
          name: item.name,
          popularity: item.popularity,
        }))],
      };

      commit('setUserTopArtists', payloadData);
    } catch (e) {
      console.error(process.env.NODE_ENV === 'production' ? 'Cannot get user\'s top artists' : e);
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
  setUserTopTracks: (state: VuexStateUser, userTopTracks: UserTopTracks) => {
    state.userTopTracks = userTopTracks;
  },
  setUserTopArtists: (state: VuexStateUser, userTopArtists: UserTopArtists) => {
    state.userTopArtists = userTopArtists;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

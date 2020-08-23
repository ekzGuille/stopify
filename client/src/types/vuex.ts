import {
  UserPlaylist,
  UserProfile,
  UserSavedTracks,
  UserTopAlbums,
  UserTopTracks,
} from '@/types/custom';

export interface VuexStateCredential {
  accessToken: string;
  refreshToken: string;
  isLogged: boolean;
  expiresIn: number;
  lastRefresh: number;
}

export interface VuexLocalStorage {
  accessToken?: string;
  refreshToken?: string;
  loginError?: string;
  expiresIn?: string;
  lastRefresh?: string;
}

export interface VuexStateUser {
  userInformation: UserProfile | null;
  userPlaylists: UserPlaylist | null;
  userSavedTracks: UserSavedTracks | null;
  userTopResources: UserTopAlbums | UserTopTracks | null;
}

interface SpotifyQuery {
  queryOffset?: number;
}

export type QueryAPI = SpotifyQuery

export interface QueryTopResources extends SpotifyQuery {
  type: 'artists' | 'tracks';
}

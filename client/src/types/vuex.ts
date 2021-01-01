import {
  UserPlaylist,
  UserProfile,
  UserSavedTracks,
  UserTopArtists,
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
  userTopArtists: UserTopArtists | null;
  userTopTracks: UserTopTracks | null;
  isTopSongs: boolean;
  isTopLongTerm: boolean;
}

interface SpotifyQuery {
  queryOffset?: number;
}

export type QueryAPI = SpotifyQuery

export interface QueryTopResources extends SpotifyQuery {
  type?: 'artists' | 'tracks';
  longTerm: boolean;
}

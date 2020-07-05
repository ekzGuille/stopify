import { UserPlaylist, UserProfile } from '@/types/spotify';

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
}

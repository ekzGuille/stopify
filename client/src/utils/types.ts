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
  userInformation: string; // TODO: No sera string sino la interfaz con los datos de la API de Spotify
}

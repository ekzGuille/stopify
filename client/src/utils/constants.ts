export const UserCredentials = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  expiresIn: 'expires_in',
  loginError: 'login_error',
  lastTokenRefresh: 'last_token_refresh',
};

export const UserData = {
  profileData: 'profile_data',
  isTopSongs: 'is_top_songs',
  isTopLongTerm: 'is_long_term',
};

export const Routes = {
  Home: {
    route: '/home',
    name: 'Home',
  },
  Top: {
    route: '/top',
    name: 'Top',
  },
  Me: {
    route: '/me',
    name: 'Me',
  },
  Redirect: {
    route: '/redirect',
    name: 'Redirect',
  },
  NotFound: {
    route: '*',
    name: 'NotFound',
  },
};

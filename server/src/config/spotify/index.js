/**
 * Spotify API configuration
 */

const STATE_KEY = 'spotify_auth_state';
const SCOPE = [
  'user-read-email',
  'playlist-read-collaborative',
  'user-read-private',
  'user-top-read',
  'playlist-read-private',
  'user-follow-read',
  'user-read-recently-played',
  'user-library-read'
].join(' ');
const RESPONSE_TYPE = 'code';
const MISMATCH_STATE_ERROR = 'state_mismatch';
const GRANT_AUTHORIZATION = 'authorization_code';
const INVALID_TOKEN_ERROR = 'invalid_token';
const GRANT_REFRESH_TOKEN = 'refresh_token';

module.exports = {
  STATE_KEY,
  SCOPE,
  RESPONSE_TYPE,
  MISMATCH_STATE_ERROR,
  GRANT_AUTHORIZATION,
  INVALID_TOKEN_ERROR,
  GRANT_REFRESH_TOKEN,
};

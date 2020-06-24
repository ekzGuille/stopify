require('dotenv').config();

/**
 * @typedef SpotifyConfig
 * @property {string} STATE_KEY
 * @property {string} SCOPE
 * @property {string} RESPONSE_TYPE
 * @property {string} MISMATCH_STATE_ERROR
 * @property {string} GRANT_AUTHORIZATION
 * @property {string} GRANT_REFRESH_TOKEN
 * @property {string} INVALID_TOKEN_ERROR
 */

/**
 * @type {SpotifyConfig}
 */
const spotifyConfig = require('./spotify');

/**
 * @typedef ENV
 * @property {string} SPOTIFY_CLIENT_ID App client id
 * @property {string} SPOTIFY_CLIENT_ID_SECRET App clien id **SECRET**
 * @property {string} SPOTIFY_CALLBACK_HOST Callback host
 * @property {string} SPOTIFY_CALLBACK_ENDPOINT Callback endpoint
 * @property {string} SPOTIFY_DEV_ENDPOINT Spotify account developers endpoint
 * @property {string} SPOTIFY_API_ENDPOINT Spotify api developers endpoint
 */

/**
 * @type {ENV}
 */
const env = {
  ...process.env,
};

module.exports = {
  env,
  spotifyConfig,
};

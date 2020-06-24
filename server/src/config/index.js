require('dotenv').config();

/**
 * @typedef ENV
 * @property {string} SPOTIFY_CLIENT_ID App client id
 * @property {string} SPOTIFY_CLIENT_ID_SECRET App clien id **SECRET**
 * @property {string} SPOTIFY_CALLBACK_ENDPOINT Callback endpoint
 * @property {string} SPOTIFY_DEV_ENDPOINT Spotify developers endpoint
 */

/**
 * @type {ENV}
 */
const env = {
  ...process.env,
};

module.exports = {
  env,
};

require('dotenv').config();

/**
 * @typedef ENV
 * @property {string} Var desc
 * @property {string} Var desc
 * @property {string} Var desc
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

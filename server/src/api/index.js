const express = require('express');
const axios = require('axios').default;
const randomString = require('randomstring');
const queryString = require('querystring');
const { env, spotifyConfig } = require('./../config');

const {
  STATE_KEY, RESPONSE_TYPE, SCOPE, MISMATCH_STATE_ERROR,
  INVALID_TOKEN_ERROR, GRANT_AUTHORIZATION, GRANT_REFRESH_TOKEN
} = spotifyConfig;

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Stopify API 🔝'
  });
});

router.get('/login', (req, res) => {
  const state = randomString.generate(16);
  res.cookie(STATE_KEY, state);
  res.redirect(`${env.SPOTIFY_DEV_ENDPOINT}/authorize?${
    queryString.stringify({
      response_type: RESPONSE_TYPE,
      client_id: env.SPOTIFY_CLIENT_ID || '',
      scope: SCOPE,
      redirect_uri: `${env.SPOTIFY_CALLBACK_HOST}/${env.SPOTIFY_CALLBACK_ENDPOINT}`,
      state,
    })}`);
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${
      queryString.stringify({
        error: MISMATCH_STATE_ERROR,
      })}`);
  } else {
    res.clearCookie(STATE_KEY);

    const formParams = new URLSearchParams();
    formParams.append('code', code);
    formParams.append('redirect_uri', `${env.SPOTIFY_CALLBACK_HOST}/${env.SPOTIFY_CALLBACK_ENDPOINT}`);
    formParams.append('grant_type', GRANT_AUTHORIZATION);
    try {
      const postResponse = await axios.post(`${env.SPOTIFY_DEV_ENDPOINT}/api/token`, formParams, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${env.SPOTIFY_CLIENT_ID || ''}:${env.SPOTIFY_CLIENT_ID_SECRET || ''}`).toString('base64')}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
      const { status, data } = postResponse;

      if (status === 200) {
        const { access_token, refresh_token } = data;

        const getResponse = await axios.get(`${env.SPOTIFY_API_ENDPOINT}/v1/me`, {
          headers: { Authorization: `Bearer ${access_token}` }
        });

        console.log(getResponse.data);
        res.redirect(`/#${
          queryString.stringify({
            access_token,
            refresh_token,
          })}`);
      }
    } catch (error) {
      res.redirect(`/#${
        queryString.stringify({
          error: INVALID_TOKEN_ERROR
        })}`);
    }
  }
});

router.get('/refresh_token', async (req, res) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;

  const formParams = new URLSearchParams();
  formParams.append('refresh_token', refresh_token);
  formParams.append('grant_type', GRANT_REFRESH_TOKEN);

  try {
    const postResponse = await axios.post(`${env.SPOTIFY_DEV_ENDPOINT}/api/token`, formParams, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.SPOTIFY_CLIENT_ID || ''}:${env.SPOTIFY_CLIENT_ID_SECRET || ''}`).toString('base64')}`,
      }
    });
    const { status, data } = postResponse;
    if (status === 200) {
      const { access_token } = data;
      res.send({
        access_token,
      });
    }
  } catch (error) {}
});


module.exports = router;

const express = require('express');
const axios = require('axios').default;
const randomString = require('randomstring');
const { env, spotifyConfig } = require('../config');

const {
  STATE_KEY, RESPONSE_TYPE, SCOPE, MISMATCH_STATE_ERROR,
  INVALID_TOKEN_ERROR, GRANT_AUTHORIZATION, GRANT_REFRESH_TOKEN
} = spotifyConfig;

const REDIRECT_URI = process.env.NODE_ENV === 'production' ? env.SPOTIFY_CALLBACK_REDIRECT : 'http://localhost:5000/callback';
const FRONT_URL = process.env.NODE_ENV === 'production' ? env.FRONT_URL : 'http://localhost:8080/redirect';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '🎵🎶🎵 Stopify API 🔝💯'
  });
});

router.get('/login', (req, res) => {
  const state = randomString.generate(16);
  res.cookie(STATE_KEY, state);

  const params = new URLSearchParams({
    response_type: RESPONSE_TYPE,
    client_id: env.SPOTIFY_CLIENT_ID || '',
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state,
  });
  res.redirect(`${env.SPOTIFY_DEV_ENDPOINT}/authorize?${params.toString()}`);
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(`${FRONT_URL}?${new URLSearchParams({ login_error: MISMATCH_STATE_ERROR }).toString()}`);
  } else {
    res.clearCookie(STATE_KEY);

    const formParams = new URLSearchParams({
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: GRANT_AUTHORIZATION,
    });
    try {
      const postResponse = await axios.post(`${env.SPOTIFY_DEV_ENDPOINT}/api/token`, formParams, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${env.SPOTIFY_CLIENT_ID || ''}:${env.SPOTIFY_CLIENT_ID_SECRET || ''}`).toString('base64')}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
      const { status, data } = postResponse;

      if (status === 200) {
        const { access_token, refresh_token, expires_in } = data;

        // Devolver al frontal la informacion del login
        res.redirect(`${FRONT_URL}?${new URLSearchParams({
          access_token,
          refresh_token,
          expires_in,
        }).toString()}`);
      }
    } catch (error) {
      res.redirect(`${FRONT_URL}?${new URLSearchParams({ login_error: INVALID_TOKEN_ERROR }).toString()}`);
    }
  }
});

router.get('/refresh_token', async (req, res, next) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;

  const formParams = new URLSearchParams({
    refresh_token,
    grant_type: GRANT_REFRESH_TOKEN,
  });

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
  } catch (error) {
    next(error);
  }
});

module.exports = router;

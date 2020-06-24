const express = require('express');
const axios = require('axios').default;

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Stopify API 🔝'
  });
});

router.post('/login', (req, res) => {
  res.json({
    message: 'Login'
  });
});
module.exports = router;

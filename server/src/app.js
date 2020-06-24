const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// const { env } = require('./config');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const limit = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
});

app.use(limit);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: '🎵🎶🎵'
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

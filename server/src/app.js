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

app.set('trust proxy', 1);

// 10 peticiones/min
const limit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

app.use(limit);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

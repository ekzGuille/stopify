const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Local: http://localhost:${port}`);
  /* eslint-enable no-console */
});

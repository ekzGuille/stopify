const os = require('os');
const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  // Network: ${os.networkInterfaces().en0[0].address}:${port}
  console.log(`
  Local: http://localhost:${port}
  Network: ${os.networkInterfaces().en1[0].address}:${port}
  `);
  /* eslint-enable no-console */
});

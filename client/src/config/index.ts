interface Env extends NodeJS.Process {
  VUE_APP_BACKEND_ENDPOINT: string;
  VUE_APP_SPOTIFY_API_ENDPOINT: string;
}
const env: Env = {
  ...process.env,
};

export default env;

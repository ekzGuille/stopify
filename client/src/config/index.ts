interface Env extends NodeJS.Process {
  VUE_APP_SPOTIFY_CLIENT_ID?: string;
  VUE_APP_SPOTIFY_CLIENT_ID_SECRET?: string;
  VUE_APP_BACKEND_ENDPOINT?: string;
}
const env: Env = {
  ...process.env,
};

export default env;

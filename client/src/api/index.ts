import env from '../config';

const BACKEND_URL = process.env.NODE_ENV === 'production' ? env.VUE_APP_BACKEND_ENDPOINT : 'http://localhost:5000';

export default BACKEND_URL;

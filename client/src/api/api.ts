import axios, { AxiosResponse } from 'axios';
import env from '../config';

axios.create({});
const BACKEND_URL = env.VUE_APP_BACKEND_ENDPOINT || 'localhost:5000';

export function login(): void {
  window.location.href = `${BACKEND_URL}/login`;
}

export function print() {
  console.log(env.VUE_APP_BACKEND_ENDPOINT);
}

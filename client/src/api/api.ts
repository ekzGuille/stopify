import axios, { AxiosResponse } from 'axios';
import env from '../config';

axios.create({});
const BACKEND_URL = process.env.NODE_ENV === 'production' ? env.VUE_APP_BACKEND_ENDPOINT : 'http://localhost:5000';

export function login(): void {
  window.location.href = `${BACKEND_URL}/login`;
}

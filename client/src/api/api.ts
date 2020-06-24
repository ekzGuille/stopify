import axios, { AxiosResponse } from 'axios';
import env from '../config';

axios.create({});
const BACKEND_URL = env.VUE_APP_BACKEND_ENDPOINT || 'localhost:5000';

export async function login(): Promise<any> {
  const { data }: AxiosResponse = await axios.post(`${BACKEND_URL}/api/login`);
  console.log(data);
  return data;
}

export function print() {
  console.log(env.VUE_APP_BACKEND_ENDPOINT);
}

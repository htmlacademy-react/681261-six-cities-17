import axios, { InternalAxiosRequestConfig } from 'axios';
import {getToken} from './token.ts';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const DEFAULT_TIMEOUT = 5000;

export function createApi() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
}

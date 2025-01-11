import axios, {AxiosError, InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import { toast } from 'react-toastify';
import {getToken} from './token.ts';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const DEFAULT_TIMEOUT = 5000;

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

type ErrorMessage = {
  errorType: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.error(error.response.data.message);
      }
      throw error;
    }
  );

  return api;
}

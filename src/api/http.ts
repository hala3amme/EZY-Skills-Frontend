import axios, { AxiosHeaders } from 'axios';
import { getApiBaseUrl } from '../config/env';
import { clearAuthToken, getAuthToken } from '../auth/tokenStorage';

export const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (!token) return config;

  config.headers = AxiosHeaders.from(config.headers);

  if (!config.headers.has('Authorization')) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      clearAuthToken();
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

import { BACKEND_DOMAIN, getDomainUrl } from '@/env';
import axios from 'axios';

export const apiPath = '/api/client'

const baseUrl = `${getDomainUrl(BACKEND_DOMAIN)}${apiPath}`

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const axiosInstance2 = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Set default timeout for all requests
axiosInstance.defaults.timeout = 5000;

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) { config.headers.Authorization = `Bearer ${accessToken}` }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/verify', {}, { withCredentials: true });
        const { accessToken } = response.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken.token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = (url: string, delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay))
    .then(() => axiosInstance.get(url))
    .then(res => res.data)
    .catch(err => { throw err });
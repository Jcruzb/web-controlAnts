
import axios from 'axios';
import { getAccessToken, logout } from '../stores/AccessTokenStore';

console.log(import.meta.env.VITE_API_URL);
const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:3001",
  });

  if (useAccessToken) {
    http.interceptors.request.use((config) => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Any status codes that falls outside the range of 2xx will trigger this function

      // If the error is due to an expired token, we'll delete it and redirect to login
      if (
        error?.response?.status &&
        [401, 403].includes(error.response.status)
      ) {
        if (getAccessToken()) {
          logout();

          if (window.location.pathname !== "/") {
            window.location.assign("/");
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return http;
};

export default createHttp;

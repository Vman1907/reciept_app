import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthService from '../services/auth.service';
import {SERVER_URL} from './const';

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('auth-token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await AuthService.refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh error, such as redirecting to login
        await AsyncStorage.removeItem('auth-token');
        await AsyncStorage.removeItem('refresh-token');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
      const refreshToken = await AsyncStorage.getItem('refresh-token');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const {data} = await api.post('/auth/signout');
        if (data.success) {
          // Clear tokens from AsyncStorage
          await AsyncStorage.removeItem('auth-token');
          await AsyncStorage.removeItem('refresh-token');
        }
      } catch (err) {
        await AsyncStorage.removeItem('auth-token');
        await AsyncStorage.removeItem('refresh-token');
      }
    }
    return Promise.reject(error);
  },
);

export default api;

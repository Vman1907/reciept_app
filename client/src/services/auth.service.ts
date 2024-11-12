import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import api from '../utils/api';

export default class AuthService {
  static async signup(email: string, password: string) {
    const {data} = await api.post('/auth/signup', {email, password});
    return data.success;
  }

  static async signin(email: string, password: string) {
    try {
      const {data} = await api.post('/auth/signin', {email, password});
      const {accessToken, refreshToken} = data;

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem('auth-token', accessToken);
      await AsyncStorage.setItem('refresh-token', refreshToken);

      return true;
    } catch (error: any) {
      console.error('Signin error:', error);
      return false;
    }
  }

  static async signOut() {
    try {
      // Make signout API call if necessary
      const {data} = await api.post('/auth/signout');
      if (data.success) {
        // Clear tokens from AsyncStorage
        await AsyncStorage.removeItem('auth-token');
        await AsyncStorage.removeItem('refresh-token');
      }
      return data.success;
    } catch (error: any) {
      console.error('Signout error:', error);
      return error.response?.data.message || 'Sign out failed';
    }
  }

  static async refreshAccessToken() {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh-token');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const {data} = await api.post('/auth/refresh-token', {
        token: refreshToken,
      });
      const {accessToken} = data;

      // Update AsyncStorage with the new access token
      await AsyncStorage.setItem('auth-token', accessToken);

      return accessToken;
    } catch (error: any) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  static async validateAuth() {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('auth-token');

      if (token) {
        // Set Authorization header with Bearer token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const {data} = await api.get('/auth/validate');
      return data.success;
    } catch (error: any) {
      console.error('Validation error:', error as AxiosError);
      return false;
    }
  }
}

import {AxiosError} from 'axios';
import api from '../utils/api';

export default class AuthService {
  static async signup(email: string, password: string) {
    const {data} = await api.post('/auth/signup', {email, password});
    return data.success;
  }

  static async signin(email: string, password: string) {
    const {data} = await api.post('/auth/signin', {email, password});
    console.log(data);
    return true;
  }

  static async signOut() {
    try {
      const {data} = await api.post('/auth/signout');
      return data.success;
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  static async refreshAccessToken() {
    try {
      const {data} = await api.post('/auth/refresh-token');
      return data;
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  static async validateAuth() {
    try {
      const {data} = await api.get('/auth/validate');
      console.log(data);
      return data.success;
    } catch (error: any) {
      console.log(error as AxiosError);
      return false;
    }
  }
}

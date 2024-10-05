import Home from '../screens/home';
import Signin from '../screens/signin';
import SignUp from '../screens/signup';

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/api';

export const COLORS = {
  PRIMARY: '#1C1B1F',
  SECONDARY: '#EFF1F5',
  TEXT_MUTED: '#A09CAB',
};

export const SCREENS = {
  LOGIN: {
    name: 'Login',
    component: Signin,
  },
  SignUp: {
    name: 'Signup',
    component: SignUp,
  },
  HOME: {
    name: 'Home',
    component: Home,
  },
};

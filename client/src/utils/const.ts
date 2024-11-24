export const SERVER_URL =
  process.env.SERVER_URL || 'http://192.168.31.115:5000/api';

export const COLORS = {
  PRIMARY: '#1C1B1F',
  SECONDARY: '#EFF1F5',
  TEXT_MUTED: '#A09CAB',
};

export const SCREENS = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',

  HOME: 'Home',
  FORM: 'Receipt_form',

  VIEW_FORM: 'View_form',
};

export const PaymentMethods = ['Cash', 'Card', 'UPI', 'Net Banking', 'Others'];

export const idTypes = [
  'PAN Card',
  'Aadhar Card',
  'Passport',
  'Driving License',
  'Other',
];

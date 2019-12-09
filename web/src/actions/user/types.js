import { apiTypes } from '../utils';

export const USER_TYPES = {
  LOGIN: apiTypes('USER_LOGIN'),
  LOGOUT: apiTypes('USER_LOGOUT'),
  DETAIL: apiTypes('USER_DETAIL'),
  TWO_FACTOR: apiTypes('TWO_FACTOR'),
  FORGOT_PASSWORD: apiTypes('FORGOT_PASSWORD'),
  RESET_PASSWORD: apiTypes('RESET_PASSWORD'),
  CLEAN_API_ERRORS: 'USER_CLEAN_API_ERRORS',
};

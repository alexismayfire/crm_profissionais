import { apiTypes } from '../utils';

export const WORKER_TYPES = {
  SERVICE_REGISTER: apiTypes('WORKER_SERVICE_REGISTER'), 
  JOB_REGISTER: apiTypes('JOB_REGISTER'), 
  CLEAN_API_ERRORS: 'USER_CLEAN_API_ERRORS',
};
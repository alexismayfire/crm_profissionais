import { apiTypes } from '../utils';

export const WORKER_TYPES = {
  JOB_REGISTER: apiTypes('JOB_REGISTER'),
  JOB_FETCH: apiTypes('JOB_FETCH'),
  CLEAN_API_ERRORS: 'WORKER_CLEAN_API_ERRORS',
};

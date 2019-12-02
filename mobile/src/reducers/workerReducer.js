import { WORKER_TYPES } from 'actions/worker/types';

const initialState = {
  job_categories: [
    { key: 1, text: 'Manicure', value: 'NS' },
    { key: 2, text: 'Estética', value: 'SC' },
    { key: 3, text: 'Cabelo', value: 'HR' },
  ],
  // ver o shape em: api/salon/worker-service/
  jobs: [],
  job: {
    id: null,
    price: '',
    time_spent: null,
    is_owner: null,
    job: {
      id: null,
      name: '',
      category: null,
    },
    worker: null,
  },
  loading: false,
  errors: {},
  message: '',
};

const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKER_TYPES.JOB_REGISTER.request:
      return { ...state, loading: true };
    case WORKER_TYPES.JOB_REGISTER.success:
      return state;
    case WORKER_TYPES.JOB_REGISTER.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.CLEAN_API_ERRORS:
      return { ...state, errors: {} };
    case WORKER_TYPES.CLEAN_MESSAGES:
      return { ...state, message: '' };
    case WORKER_TYPES.JOB_FETCH.request:
      return { ...state, loading: true };
    case WORKER_TYPES.JOB_FETCH.success:
      return { ...state, loading: false, ...action.payload };
    case WORKER_TYPES.JOB_FETCH.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.JOB_FETCH_DETAIL.request:
      return { ...state, loading: true };
    case WORKER_TYPES.JOB_FETCH_DETAIL.success:
      return { ...state, loading: false, ...action.payload };
    case WORKER_TYPES.JOB_FETCH_DETAIL.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.JOB_UPDATE.request:
      return { ...state, loading: true };
    case WORKER_TYPES.JOB_UPDATE.success:
      return { ...state, loading: false, ...action.payload };
    case WORKER_TYPES.JOB_UPDATE.failure:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default workerReducer;

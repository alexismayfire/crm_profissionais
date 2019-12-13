import { WORKER_TYPES } from 'actions/worker/types';

const initialState = {
  job_categories: [
    { key: 1, text: 'Cabelo', value: 'HR' },
    { key: 2, text: 'Manicure', value: 'NS' },
    { key: 3, text: 'Maquiagem', vakue: 'MK' },
    { key: 4, text: 'Estética', value: 'SC' },
    { key: 5, text: 'Depilação', value: 'WX' },
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
  portfolio: [{}],
  customers: [],
  customMessage: {
    ratingMessage: '',
    customerMessage: '',
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
      return { ...state, loading: false, ...action.payload };
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
    case WORKER_TYPES.CUSTOMER_FETCH.request:
      return { ...state, loading: true };
    case WORKER_TYPES.CUSTOMER_FETCH.success:
      return { ...state, loading: false, ...action.payload };
    case WORKER_TYPES.CUSTOMER_FETCH.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.JOB_CLEAR:
      return { ...state, job: initialState.job };
    case WORKER_TYPES.PORTFOLIO_CREATE.request:
      return { ...state, loading: true };
    case WORKER_TYPES.PORTFOLIO_CREATE.success:
      const updatedPortfolio = state.portfolio;
      updatedPortfolio.push(action.payload.image);

      return {
        ...state,
        loading: false,
        message: action.payload.message,
        portfolio: updatedPortfolio,
      };
    case WORKER_TYPES.PORTFOLIO_CREATE.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.PORTFOLIO_FETCH.request:
      return { ...state, loading: true };
    case WORKER_TYPES.PORTFOLIO_FETCH.success:
      return { ...state, loading: false, ...action.payload };
    case WORKER_TYPES.PORTFOLIO_FETCH.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.PORTFOLIO_UPDATE.request:
      return { ...state, loading: true };
    case WORKER_TYPES.PORTFOLIO_UPDATE.success:
      const { updatedImage } = action.payload;

      return {
        ...state,
        loading: false,
        message: action.payload.message,
        portfolio: state.portfolio.map(image =>
          image.id === updatedImage.id ? updatedImage : image
        ),
      };
    case WORKER_TYPES.PORTFOLIO_UPDATE.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.PORTFOLIO_DELETE.request:
      return { ...state, loading: true };
    case WORKER_TYPES.PORTFOLIO_DELETE.success:
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        message: action.payload.message,
        portfolio: state.portfolio.filter(image => image.id !== id),
      };
    case WORKER_TYPES.PORTFOLIO_DELETE.failure:
      return { ...state, loading: false, errors: action.payload };
    case WORKER_TYPES.CREATE_NOTIFICATION.request:
    case WORKER_TYPES.CREATE_NOTIFICATION.success:
    case WORKER_TYPES.CREATE_NOTIFICATION.failure:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default workerReducer;

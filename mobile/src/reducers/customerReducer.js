import { CUSTOMER_TYPES } from 'actions/customer/types';

const initialState = {
  jobs: [],
  loading: false,
  errors: {},
  message: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_TYPES.CLEAN_API_ERRORS:
      return { ...state, errors: {} };
    case CUSTOMER_TYPES.CLEAN_MESSAGES:
      return { ...state, message: '' };
    case CUSTOMER_TYPES.JOB_FETCH.request:
      return { ...state, loading: true };
    case CUSTOMER_TYPES.JOB_FETCH.success:
      return { ...state, loading: false, ...action.payload };
    case CUSTOMER_TYPES.JOB_FETCH.failure:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default customerReducer;

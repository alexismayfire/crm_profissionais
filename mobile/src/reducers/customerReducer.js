import { CUSTOMER_TYPES } from 'actions/customer/types';

const initialState = {
  distanceRanges: [
    { text: 'Qualquer', value: 'ALL' },
    { text: '2 km', value: 2.0 },
    { text: '5 km', value: 5.0 },
    { text: '10 km', value: 10.0 },
    { text: '20 km', value: 20.0 },
  ],
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

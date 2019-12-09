import { USER_TYPES } from 'actions/user/types';

const initialState = {
  token: '',
  _token: '',
  loading: false,
  errors: {},
  message: '',
  data: {
    name: '',
    email: '',
    phone: '',
    mobile_phone: '',
    is_customer: null,
    worker: {
      id: null,
      salon: null,
      about: null,
    },
  },
  twoFactor: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.LOGIN.request:
      return { ...initialState, loading: true };
    case USER_TYPES.LOGIN.success:
      return { ...state, loading: false, twoFactor: true, ...action.payload };
    case USER_TYPES.LOGIN.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.TWO_FACTOR.request:
      return state;
    case USER_TYPES.TWO_FACTOR.success:
      return { ...state, ...action.payload };
    case USER_TYPES.TWO_FACTOR.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.LOGOUT.request:
      return { ...state, loading: true };
    case USER_TYPES.LOGOUT.success:
      return { ...initialState, message: action.payload };
    case USER_TYPES.LOGOUT.failure:
      return { ...initialState };
    case USER_TYPES.DETAIL.request:
      return { ...state, loading: true };
    case USER_TYPES.DETAIL.success:
      return { ...state, loading: false, ...action.payload };
    case USER_TYPES.DETAIL.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.FORGOT_PASSWORD.request:
      return { ...initialState, loading: true };
    case USER_TYPES.FORGOT_PASSWORD.success:
      return { ...state, loading: false, ...action.payload };
    case USER_TYPES.FORGOT_PASSWORD.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.RESET_PASSWORD.request:
      return { ...initialState, loading: true };
    case USER_TYPES.RESET_PASSWORD.success:
      return { ...state, loading: false, ...action.payload };
    case USER_TYPES.RESET_PASSWORD.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.CLEAN_API_ERRORS:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;

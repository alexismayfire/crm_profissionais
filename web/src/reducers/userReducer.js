import { USER_TYPES } from "actions/user/types";

const initialState = {
  token: "",
  loading: false,
  errors: {},
  data: {
    name: "",
    email: "",
    is_customer: true
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.LOGIN.request:
      return { ...initialState, loading: true };
    case USER_TYPES.LOGIN.success:
      return { ...state, loading: false, ...action.payload };
    case USER_TYPES.LOGIN.failure:
      return { ...state, loading: false, errors: action.payload };
    case USER_TYPES.LOGIN.clean:
      return { ...initialState }
    case USER_TYPES.LOGOUT.request:
      return { ...state, loading: true };
    case USER_TYPES.LOGOUT.success:
      return { ...initialState };
    case USER_TYPES.LOGOUT.failure:
      return { ...initialState };
    case USER_TYPES.DETAIL.request:
      return { ...state, loading: true };
    case USER_TYPES.DETAIL.success:
      return { ...state, loading: false, ...action.payload };
    case USER_TYPES.DETAIL.failure:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default userReducer;
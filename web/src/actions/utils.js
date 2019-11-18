import axios from "axios";

export const apiClient = token => {
  const headers = token ? { Authorization: `Token ${token}` } : null;
  const baseURL = "http://localhost:8000/api";
  if (headers) {
    return axios.create({ baseURL, headers });
  }
  return axios.create({ baseURL });
};

export const apiTypes = base => ({
  request: `${base.toUpperCase()}_REQUEST`,
  success: `${base.toUpperCase()}_SUCCESS`,
  failure: `${base.toUpperCase()}_FAILURE`
});

export const apiActionCreators = (dispatch, types) => ({
  request: () => dispatch({ type: types.request }),
  success: payload => dispatch({ type: types.success, payload }),
  failure: payload => dispatch({ type: types.failure, payload })
});

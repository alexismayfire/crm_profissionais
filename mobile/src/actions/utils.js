import axios from 'axios';
import { LOCAL_IP } from 'react-native-dotenv';

export const apiClient = (token, file = null) => {
  const headers = token ? { Authorization: `Token ${token}` } : null;

  if (file) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  // https://www.freecodecamp.org/news/how-to-gracefully-use-environment-variables-in-a-react-native-app/
  const baseURL = `http://${LOCAL_IP}:8000/api`;

  if (headers) {
    return axios.create({ baseURL, headers });
  }

  console.log(baseURL);
  return axios.create({ baseURL });
};

export const apiTypes = base => ({
  request: `${base.toUpperCase()}_REQUEST`,
  success: `${base.toUpperCase()}_SUCCESS`,
  failure: `${base.toUpperCase()}_FAILURE`,
});

export const apiActionCreators = (dispatch, types) => ({
  request: () => dispatch({ type: types.request }),
  success: payload => dispatch({ type: types.success, payload }),
  failure: payload => dispatch({ type: types.failure, payload }),
});

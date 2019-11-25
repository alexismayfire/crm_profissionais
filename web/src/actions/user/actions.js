import history from '../../history';
import { apiActionCreators, apiClient } from '../utils';
import { USER_TYPES } from './types';

export const login = (email, password) => async dispatch => {
  const actions = apiActionCreators(dispatch, USER_TYPES.LOGIN);
  const endpoint = '/users/login/';
  const client = apiClient();
  const data = { email, password };

  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const { key: token } = response.data;
    actions.success({ token });
    dispatch(userDetails());
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure({ [key]: data[key][0] });
  }
};

export const logout = token => async dispatch => {
  const actions = apiActionCreators(dispatch, USER_TYPES.LOGOUT);
  const endpoint = '/users/logout/';
  const client = apiClient();
  const data = { token };

  try {
    actions.request();
    await client.post(endpoint, data);
    history.push('/login');
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure({ [key]: data[key][0] });
  }
};

export const cleanLoginErrors = () => dispatch => {
  dispatch({ type: USER_TYPES.LOGIN.clean });
};

export const userDetails = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, USER_TYPES.DETAIL);
  const endpoint = '/users/user/';
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    const user = response.data;
    actions.success({ data: user });
    if (user.username) {
      history.push('/worker/home');
    } else {
      history.push('/customer/home');
    }
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};
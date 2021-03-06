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
    actions.success('Você fez logout com sucesso!');
    history.push('/login');
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure({ [key]: data[key][0] });
  }
};

export const cleanApiErrors = () => dispatch => {
  dispatch({ type: USER_TYPES.CLEAN_API_ERRORS });
};

export const forgotPassword = email => async dispatch => {
  const actions = apiActionCreators(dispatch, USER_TYPES.FORGOT_PASSWORD);
  const endpoint = '/users/password/reset/';
  const client = apiClient();
  const data = { email };

  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const payload = response.data.detail;
    const message = `Um email foi enviado para ${email} para redefinir sua senha`;
    actions.success({ message });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure({ [key]: data[key][key][0] });
  }
};

export const resetPassword = (
  password1,
  password2,
  uid,
  key
) => async dispatch => {
  const actions = apiActionCreators(dispatch, USER_TYPES.RESET_PASSWORD);
  const endpoint = '/users/password/reset/confirm/';
  const client = apiClient();
  const data = { password1, password2, uid, key };

  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const payload = response.data.detail;
    actions.success({ message: payload });
  } catch (err) {
    const data = err.response.data;
    console.log(data);
    const key = Object.keys(data)[0];
    console.log(key, data[key]);
    actions.failure({ [key]: data[key][0] });
  }
};

export const userDetails = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, USER_TYPES.DETAIL);
  const endpoint = '/users/me/';
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    const user = response.data;
    actions.success({ data: user });
    if (user.is_customer) {
      history.push('/customer/home');
    } else {
      history.push('/worker/home');
    }
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const register = (
  name,
  mobile_phone,
  email,
  password1,
  password2
) => async dispatch => {};

export const CustomerSearch = search => async dispatch => {};

export const customerRating = (rating, comment) => async dispatch => {};

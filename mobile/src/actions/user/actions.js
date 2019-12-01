import { apiActionCreators, apiClient } from '../utils';
import { USER_TYPES } from './types';

export const login = (email, password, navigation, setFormSubmission) => async dispatch => {
  const actions = apiActionCreators(dispatch, USER_TYPES.LOGIN);
  const endpoint = '/users/login/';
  const client = apiClient();
  const data = { email, password };

  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const { key: token } = response.data;
    actions.success({ token });
    dispatch(userDetails(navigation));
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure({ [key]: data[key][0] });
    setFormSubmission(false);
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

export const forgotPassword = (email, setFormSubmission) => async dispatch => {
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

  setFormSubmission(false);
};

export const resetPassword = (password1, password2, uid, key) => async dispatch => {
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
    actions.failure( { [key]: data[key][0] });
  }
};

export const userDetails = (navigation = null) => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, USER_TYPES.DETAIL);
  const endpoint = '/users/user/';
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    const user = response.data;
    actions.success({ data: user });
    if (navigation) {
      if (user.is_customer) {
        navigation.navigate('CustomerHome');
      } else {
        navigation.navigate('WorkerHome');
      }
    }
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

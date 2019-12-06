import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';

export const jobRegister = (name, category, price, time_spent) => async (
  dispatch,
  getState
) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_REGISTER);
  const endpoint = '/salon/worker-service/';
  const client = apiClient();
  const worker = getState().user.data.worker.id;
  const data = {
    job: { name, category },
    price,
    time_spent,
    is_owner: true,
    worker,
  };

  if (worker) {
    try {
      actions.request();
      const response = await client.post(endpoint, data);
      const message = 'Cadastrado com sucesso!';
      actions.success({ message });
    } catch (err) {
      const data = err.response.data;
      const key = Object.keys(data)[0];
      actions.failure(data[key][0]);
    }
  } else {
    actions.failure({ non_field_errors: 'Usuário não está logado!' });
  }
};

export const cleanApiErrors = () => dispatch => {
  dispatch({ type: WORKER_TYPES.CLEAN_API_ERRORS });
};

export const jobsFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_FETCH);
  const endpoint = '/salon/worker-service/';
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ jobs: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const customerFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.CUSTOMER_FETCH);
  const endpoint = '/appointments/appointment/';
  const { token } = getState().user;
  const client = apiClient(token);
  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ customers: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};
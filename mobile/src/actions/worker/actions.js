import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';

export const jobsCreate = (name, category, price, time_spent) => async (
  dispatch,
  getState
) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_REGISTER);
  const endpoint = '/salon/worker-service/';
  const { token, data: userData } = getState().user;
  const client = apiClient(token);
  const data = {
    job: { name, category },
    price,
    time_spent,
    is_owner: true,
    worker: userData.worker.id,
  };

  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const message = 'Cadastrado com sucesso!';
    actions.success({ message });
  } catch (err) {
    const data = err.response.data;
    console.log('ERRO CREATE ACTION: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const cleanApiErrors = () => dispatch => {
  dispatch({ type: WORKER_TYPES.CLEAN_API_ERRORS });
};

export const cleanMessages = () => dispatch => {
  dispatch({ type: WORKER_TYPES.CLEAN_MESSAGES });
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

export const jobsFetchDetail = id => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_FETCH_DETAIL);
  const endpoint = `/salon/worker-service/${id}/`;
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ job: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const jobsUpdate = (id, name, category, price, time_spent) => async (
  dispatch,
  getState
) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_UPDATE);
  const endpoint = `/salon/worker-service/${id}/`;
  const { token } = getState().user;
  const client = apiClient(token);
  const data = {
    job: { id, name, category },
    price,
    time_spent,
    is_owner: true,
  };

  try {
    actions.request();
    const response = await client.patch(endpoint, data);
    const message = 'Atualizado com sucesso!';
    actions.success({ message, job: response.data });
  } catch (err) {
    const data = err.response.data;
    console.log('ERRO UPDATE ACTION: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const cleanJob = () => dispatch => {
  dispatch({ type: WORKER_TYPES.JOB_CLEAR });
};

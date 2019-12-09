import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';
import uuid from 'uuid/v4';

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

export const portfolioCreate = image => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_CREATE);
  const endpoint = `/salon/worker-portfolio/`;
  const { token, data: userData } = getState().user;
  const client = apiClient(token, (file = true));

  const { uri } = image;

  try {
    actions.request();
    const data = new FormData();
    const photoId = uuid();
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];
    data.append('photo', {
      uri,
      type: `image/${extension}`,
      name: `${photoId}.${extension}`,
    });
    data.append('worker', userData.worker.id);
    const response = await client.post(endpoint, data);
    const message = 'Foto carregada com sucesso!';
    actions.success({ message, image: response.data });
  } catch (err) {
    const data = err.response.data;
    console.log('ERRO PORTFOLIO: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const portfolioFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_FETCH);
  const { id } = getState().user.data.worker;
  const endpoint = `/salon/worker-portfolio/?worker=${id}`;
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ portfolio: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const portfolioUpdate = (image, id) => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_UPDATE);
  const endpoint = `/salon/worker-portfolio/${id}/`;
  const { token, data: userData } = getState().user;
  const client = apiClient(token, (file = true));

  const { uri } = image;

  try {
    actions.request();
    const data = new FormData();
    const photoId = uuid();
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];
    data.append('photo', {
      uri,
      type: `image/${extension}`,
      name: `${photoId}.${extension}`,
    });
    const response = await client.patch(endpoint, data);
    const message = 'Foto atualizada com sucesso!';
    actions.success({ message, updatedImage: response.data });
  } catch (err) {
    console.log(err);
    const data = err.response.data;
    console.log('ERRO PORTFOLIO: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const portfolioDelete = id => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_DELETE);
  const endpoint = `/salon/worker-portfolio/${id}/`;
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.delete(endpoint);
    const message = 'Foto removida com sucesso!';
    actions.success({ message, id });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

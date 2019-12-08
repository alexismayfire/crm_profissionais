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

export const portfolioCreate = values => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_UPDATE);
  const endpoint = `/salon/worker-portfolio/`;
  const { token, data: userData } = getState().user;
  const client = apiClient(token, (file = true));

  actions.request();

  const { photos } = values;
  const errors = [];

  for (const photo of photos) {
    const data = new FormData();
    const photoId = uuid();
    const uriParts = picture.uri.split('.');
    const extension = uriParts[uriParts.length - 1];
    data.append('photo', {
      uri: photo.uri,
      type: `image/${extension}`,
      name: `${photoId}.${extension}`,
    });
    data.append('worker', userData.worker.id);

    try {
      await client.post(endpoint, data);
    } catch (err) {
      errors.push({
        uri: photo.uri,
        errorData: err.response.data,
      });
    }
  }

  if (errors.length) {
    const message = `
      Houve um erro ao processar o upload de algumas fotos. 
      Tente novamente!`;
    console.log(errors);
    actions.failure({ non_field_errors: message });
  } else {
    const message = `Imagens carregadas com sucesso!`;
    actions.success({ message });
  }
  /*
  try {
    actions.request();
    const response = await client.post(endpoint, data);
    const message = 'Atualizado com sucesso!';
    actions.success({ message });
  } catch (err) {
    const data = err.response.data;
    console.log('ERRO PORTFOLIO: ');
    console.log(data);
    actions.failure(data);
  }
  */
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

import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';
import history from '../../history';

export const jobRegister = (name, category, price, time_spent) => async (
  dispatch,
  getState
) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_REGISTER);
  const endpoint = '/salon/worker-service/';
  const { token } = getState().user;
  const client = apiClient(token);
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
      history.push('/meus-servicos');
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

export const billing = () => async (dispatch, getState) => {
  /*const actions = apiActionCreators(dispatch, WORKER_TYPES.BILLING);
  const endpoint = '/appointments/billing/';
  const { token } = getState().user;
  const client = apiClient(token);  
  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ billing: response.data });    
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }*/
};

export const portfolioFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_FETCH);
  const { id } = getState().user.data.worker;
  const endpoint = `/salon/worker/${id}/`;
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();    
    //const data = { about };
    const response = await client.get(endpoint);
    console.log(response.data);
    const about = response.data['about'];
    actions.success({ about });
    history.push('/profile');
  } catch (err) {
    console.log(err);
    /*const data = err.response.data;
    console.log('ERRO PORTFOLIO: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);*/
  }
};
export const portfolioUpdate = (about, pics) => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, WORKER_TYPES.PORTFOLIO_UPDATE);
  const { id } = getState().user.data.worker;
  const endpoint = `/salon/worker/${id}/`;
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();    
    const data = { about };
    const response = await client.patch(endpoint, data);
    console.log(data);
    const message = 'Portfolio atualizado com sucesso!';
    actions.success({ message, about });
    history.push('/profile');
  } catch (err) {
    console.log(err);
    const data = err.response.data;
    console.log('ERRO PORTFOLIO: ');
    console.log(data);
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};
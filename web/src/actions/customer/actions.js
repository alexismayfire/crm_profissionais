import { apiActionCreators, apiClient } from '../utils';
import { CUSTOMER_TYPES } from './types';
import history from '../../history';

export const cleanApiErrors = () => dispatch => {
  dispatch({ type: CUSTOMER_TYPES.CLEAN_API_ERRORS });
};

export const cleanMessages = () => dispatch => {
  dispatch({ type: CUSTOMER_TYPES.CLEAN_MESSAGES });
};

export const jobsFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, CUSTOMER_TYPES.JOB_FETCH);
  const endpoint = '/salon/worker-service/';
  //const { token } = getState().user;
  const client = apiClient();

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

export const appointmentsFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, CUSTOMER_TYPES.APPOINTMENT_FETCH);
  const endpoint = '/appointments/appointment/';
  const { token } = getState().user;
  const client = apiClient(token);

  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ appointments: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const appointmentsRegister = (worker, service, start_time) => async (dispatch, getState) => {
    const actions = apiActionCreators(dispatch, CUSTOMER_TYPES.APPOINTMENT_REGISTER);
    const endpoint = '/appointments/appointment';
    const { token, id } = getState().user;
    const client = apiClient(token);
    const data = { user: id, with_person: worker, start_time: start_time }
    try{
      actions.request();
      const response = await client.post(endpoint, data);
      console.log(response.data);
      history.push('/meus-agendamentos');
    } catch (err) {
      console.log(err);
    }
    
};

export const workerFetch = () => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, CUSTOMER_TYPES.WORKER_FETCH);
  const endpoint = '/salon/worker/';
  //const { token } = getState().user;
  const client = apiClient();

  try {
    actions.request();
    const response = await client.get(endpoint);
    actions.success({ workers: response.data });
  } catch (err) {
    const data = err.response.data;
    const key = Object.keys(data)[0];
    actions.failure(data[key][0]);
  }
};

export const workerFav = (worker) => async (dispatch, getState) => {
  const actions = apiActionCreators(dispatch, CUSTOMER_TYPES.WORKER_FETCH);
  const fav_workers = getState().customer.fav_workers.append(worker);
  actions.success({ fav_workers });  
};
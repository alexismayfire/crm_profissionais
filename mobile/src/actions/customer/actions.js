import { apiActionCreators, apiClient } from '../utils';
import { CUSTOMER_TYPES } from './types';

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

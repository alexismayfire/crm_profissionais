import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';

export const serviceRegister = (price, time_spent) => async dispatch => {
    const actions = apiActionCreators(dispatch, WORKER_TYPES.SERVICE_REGISTER);
    const endpoint = '/salon/worker-service/';
    const client = apiClient();
    const data = {price, time_spent};

    try {
        actions.request();
        const response = await client.post(endpoint, data);
        const message = 'Cadastrado com sucesso!';
        actions.success({message});
    } catch (err) {
        const data = err.response.data;
        const key = Object.keys(data)[0];
        actions.failure(data[key][0]);
    }
};

export const jobRegister = (price, timeSpent, name, category) => async dispatch => {
    const actions = apiActionCreators(dispatch, WORKER_TYPES.JOB_REGISTER);
    const endpoint = '/salon/job/';
    const client = apiClient();
    const data = {name, category};

    try {
        actions.request();
        const response = await client.post(endpoint, data);
        actions.success();
        dispatch(serviceRegister(price, timeSpent));
    } catch (err) {
        const data = err.response.data;
        const key = Object.keys(data)[0];
        actions.failure(data[key][0]);
    }
};

export const portfolioRegister = () => async dispatch => {

};

export const profileRegister = () => async dispatch => {

};

export const roleRegister = () => async dispatch => {

};

export const cleanApiErrors = () => dispatch => {
    dispatch({ type: WORKER_TYPES.CLEAN_API_ERRORS });
};
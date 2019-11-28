import history from '../../history';
import { apiActionCreators, apiClient } from '../utils';
import { WORKER_TYPES } from './types';

export const serviceRegister = (price, timeSpent, name, category) => async dispatch => {
    const actions = apiActionCreators(dispatch, WORKER_TYPES.SERVICE_REGISTER);
    const endpoint = '/worker/service_register/';
    const client = apiClient();
    const data = {price, timeSpent, name, category};

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

export const cleanApiErrors = () => dispatch => {
    dispatch({ type: WORKER_TYPES.CLEAN_API_ERRORS });
};
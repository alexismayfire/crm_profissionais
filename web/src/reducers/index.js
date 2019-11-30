import { combineReducers } from 'redux';

import userReducer from './userReducer';
import workerReducer from './workerReducer';

export default combineReducers({
  user: userReducer,
  worker: workerReducer
});

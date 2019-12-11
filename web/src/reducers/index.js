import { combineReducers } from 'redux';

import userReducer from './userReducer';
import workerReducer from './workerReducer';
import customerReducer from './customerReducer';

export default combineReducers({
  user: userReducer,
  worker: workerReducer,
  customer: customerReducer,
});

import { combineReducers } from 'redux';
import msalReducer from './msalReducer';

export default combineReducers({
  msal: msalReducer
});
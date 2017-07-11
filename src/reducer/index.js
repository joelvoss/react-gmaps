import { combineReducers } from 'redux';
import marker from './marker';
import google from './google';

const globalReducer = combineReducers({
  marker,
  google
});

export default globalReducer;

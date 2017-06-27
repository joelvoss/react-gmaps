import { combineReducers } from 'redux';
import marker from './marker';

const globalReducer = combineReducers({
  marker,
});

export default globalReducer;

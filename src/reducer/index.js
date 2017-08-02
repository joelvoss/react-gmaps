import { combineReducers } from 'redux';
import markerReducer from './marker';
import googleReducer from './google';
import geolocationReducer from './geolocation';

const globalReducer = combineReducers({
  marker: markerReducer,
  google: googleReducer,
  geolocation: geolocationReducer
});

export default globalReducer;

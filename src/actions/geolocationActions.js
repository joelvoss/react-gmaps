import * as types from '../constants';
import GeolocationService from 'utilities/GeolocationService';
import { toggleMapLoading } from './googleActions';


export function startGeolocation(config) {
  return dispatch => {
    // first, dispatch an action to toggle the loading animation on
    dispatch(toggleMapLoading(true));

    // then, geolocate the user
    GeolocationService()
      // we have a user position, save it
      .then(res => {
        dispatch(saveGeolocation(res));
        dispatch(toggleMapLoading(true));
      })
      // we DONT have a user position, use the fallback position
      .catch(err => {
        console.error(err);
        // geolocation error, set default location
        const defaultLocation = {
          lat: config.map.default_lat,
          lng: config.map.default_lng
        }
        dispatch(saveGeolocation(defaultLocation));
        dispatch(toggleMapLoading(true));
      });
  };
}

export function saveGeolocation(pos) {
  return {
    type: types.SAVE_GEOLOCATION,
    pos
  };
}

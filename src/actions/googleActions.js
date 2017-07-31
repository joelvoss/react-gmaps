import * as types from '../constants';
import LoadGoogleLibrary from 'utilities/LoadGoogleLibrary';

export function loadGoogleMapsLibrary(config) {
  return dispatch => {
    console.log('inside thunk', config);
    const glib = new LoadGoogleLibrary(config);

    glib.init()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };
}

export function saveGoogle(google) {
  return {
    type: types.SAVE_GOOGLE,
    google
  };
}

export function saveMap(map) {
  return {
    type: types.SAVE_MAP,
    map
  };
}

export function savePlacesService(placesService) {
  return {
    type: types.SAVE_PLACES_SERVICE,
    placesService
  };
}

export function toggleMapLoading(loadingState) {
  return {
    type: types.TOGGLE_MAP_LOADING,
    loadingState
  };
}

export function saveMapConfig(config) {
  return {
    type: types.SAVE_MAP_CONFIG,
    config
  }
}

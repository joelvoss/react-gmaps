import * as types from '../constants';
import GoogleLibraryService from 'utilities/GoogleLibraryService';

/**
 * This action loads the google maps api if it's not already available and
 * displays a loading animation in the meantime.
 * @param  {object} config - The google maps api config
 * @return {redux-thunk}   - Returns a thunk
 */
export function loadGoogleMapsLibrary(config) {
  return dispatch => {
    // first, dispatch an action to toggle the loading animation on
    dispatch(toggleMapLoading(true));

    // then, load the google maps api
    GoogleLibraryService(config)
      .then(res => {
        // when the api finished loading,
        // dispatch a save google event and toggle the loading animation off
        dispatch(saveGoogle(res));
        dispatch(toggleMapLoading(false));
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

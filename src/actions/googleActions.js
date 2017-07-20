import * as types from '../constants';

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

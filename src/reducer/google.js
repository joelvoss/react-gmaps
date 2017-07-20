import * as types from './../constants';

const initialState = {
  loaded: false,
  lib: null,
  map: null,
  placesService: null
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_GOOGLE:
      return Object.assign({}, state, {
        loaded: true,
        lib: action.google
      });

    case types.SAVE_MAP:
      return Object.assign({}, state, {
        map: action.map
      });

    case types.SAVE_PLACES_SERVICE:
      return Object.assign({}, state, {
        placesService: action.placesService
      });

    default:
      return state;
  }
};

export default map;

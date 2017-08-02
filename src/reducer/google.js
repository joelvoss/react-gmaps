import * as types from './../constants';

const initialState = {
  lib: null,
  map: null,
  placesService: null,
  config: null,
  loading: false
};

const googleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_GOOGLE:
      return Object.assign({}, state, {
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

    case types.TOGGLE_MAP_LOADING:
      return Object.assign({}, state, {
        loading: action.loadingState
      });

    case types.SAVE_MAP_CONFIG:
      return Object.assign({}, state, {
        config: action.config
      })

    default:
      return state;
  }
};

export default googleReducer;

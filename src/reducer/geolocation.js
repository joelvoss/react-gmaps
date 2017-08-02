import * as types from './../constants';

const initialState = {
  lat: null,
  lng: null
};

const geolocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_GEOLOCATION:
      return Object.assign({}, state, {
        lat: action.pos.lat,
        lng: action.pos.lng
      });

    default:
      return state;
  }
};

export default geolocationReducer;

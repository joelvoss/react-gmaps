import * as types from './../constants';

const initialState = {
  list: [],
  selectedMarker: null
};

const marker = (state = initialState, action) => {
  switch (action.type) {
    // Replaces the current list of markers with a new list.
    case types.REPLACE_MARKERS_WITH_NEW:
      return Object.assign({}, state, {
        list: action.payload
      });

    // Sets the hover state of a marker.
    case types.HOVER_MARKER:
      return Object.assign({}, state, {
        list: state.list.map(marker => {
          if (marker.id === action.id) {
            return Object.assign({}, marker, { hovered: true });
          } else {
            return marker;
          }
        })
      });

    // Set the hover state of a marker.
    case types.UNHOVER_MARKER:
      return Object.assign({}, state, {
        list: state.list.map(marker => {
          if (marker.id === action.id) {
            return Object.assign({}, marker, { hovered: false });
          } else {
            return marker;
          }
        })
      });

    // Select a marker by its id.
    case types.SELECT_MARKER:
      return Object.assign({}, state, {
        selectedMarker: state.list.find(marker => marker.id === action.id)
      });

    default:
      return state;
  }
};

export default marker;

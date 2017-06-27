import uuidv4 from 'uuid/v4';
import * as types from './../constants';

const initialState = [
  { id: uuidv4(), lat: 51.271404538893385, lng: 7.124785666335966, hovered: false },
  { id: uuidv4(), lat: 51.21842795892962, lng: 7.238430837129359, hovered: false },
  { id: uuidv4(), lat: 51.21842795892962, lng: 7.238430837129359, hovered: false },
  { id: uuidv4(), lat: 51.24209689453857, lng: 6.994760000496646, hovered: false },
  { id: uuidv4(), lat: 51.226764362991865, lng: 7.012966459674857, hovered: false },
  { id: uuidv4(), lat: 51.25309333768975, lng: 7.110313389412997, hovered: false },
  { id: uuidv4(), lat: 51.228569717053425, lng: 7.0157762934532535, hovered: false },
  { id: uuidv4(), lat: 51.25493934706946, lng: 7.260912987519032, hovered: false },
  { id: uuidv4(), lat: 51.2457701857236, lng: 7.220829229439893, hovered: false },
  { id: uuidv4(), lat: 51.255677764378085, lng: 7.198609573469284, hovered: false },
  { id: uuidv4(), lat: 51.2005652588738, lng: 7.228385442919663, hovered: false },
];

const marker = (state = initialState, action) => {
  switch (action.type) {
    case types.MOUSEOVER_MARKER:
      return state.map(marker => {
        if (marker.id === action.id) {
          return Object.assign({}, marker, { hovered: true });
        } else {
          return marker;
        }
      });

    case types.MOUSELEAVE_MARKER:
      return state.map(marker => {
        if (marker.id === action.id) {
          return Object.assign({}, marker, { hovered: false });
        } else {
          return marker;
        }
      });

    default:
      return state;
  }
}

export default marker;

import * as types from '../constants';

export function hoverMarker(id) {
  return {
    type: types.HOVER_MARKER,
    id
  };
}

export function unhoverMarker(id) {
  return {
    type: types.UNHOVER_MARKER,
    id
  };
}

export function selectMarker(id) {
  return {
    type: types.SELECT_MARKER,
    id
  };
}

export function replaceMarkersWithNew(payload) {
  return {
    type: types.REPLACE_MARKERS_WITH_NEW,
    payload
  };
}

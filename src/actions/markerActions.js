import * as types from './../constants';

export function mouseOverMarker(id) {
  return { 
    type: types.MOUSEOVER_MARKER,
    id
  }
}

export function mouseLeaveMarker(id) {
  return { 
    type: types.MOUSELEAVE_MARKER,
    id
  }
}
import uuidv4 from 'uuid/v4';
import * as types from './../constants';

const initialState = {
  list: [
    {
      id: uuidv4(),
      lat: 51.271404538893385,
      lng: 7.124785666335966,
      hovered: false,
      title: 'Sit Ltd',
      desc: 'felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla.',
      meta: 'Ap #589-9271 Nunc St.'
    },
    {
      id: uuidv4(),
      lat: 51.21842795892962,
      lng: 7.238430837129359,
      hovered: false,
      title: 'Dolor Sit Institute',
      desc: 'arcu. Curabitur ut odio vel est tempor bibendum. Donec felis',
      meta: '355 Dis Ave'
    },
    {
      id: uuidv4(),
      lat: 51.21842795892962,
      lng: 7.238430837129359,
      hovered: false,
      title: 'Mauris Foundation',
      desc: 'Ut tincidunt vehicula risus. Nulla eget metus eu erat semper',
      meta: 'P.O. Box 754, 2832 Sit Rd.'
    },
    {
      id: uuidv4(),
      lat: 51.24209689453857,
      lng: 6.994760000496646,
      hovered: false,
      title: 'Rutrum LLP',
      desc: 'quis accumsan convallis, ante lectus convallis est, vitae sodales nisi',
      meta: '291-3079 Morbi Street'
    },
    {
      id: uuidv4(),
      lat: 51.226764362991865,
      lng: 7.012966459674857,
      hovered: false,
      title: 'Condimentum Eget LLC',
      desc: 'nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed',
      meta: 'P.O. Box 662, 2458 Enim Avenue'
    },
    {
      id: uuidv4(),
      lat: 51.25309333768975,
      lng: 7.110313389412997,
      hovered: false,
      title: 'Ac Ipsum Ltd',
      desc: 'id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim',
      meta: 'P.O. Box 916, 8492 Facilisis Road'
    },
    {
      id: uuidv4(),
      lat: 51.228569717053425,
      lng: 7.0157762934532535,
      hovered: false,
      title: 'Class Aptent Taciti Inc.',
      desc: 'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam',
      meta: 'Ap #646-8177 Etiam St.'
    },
    {
      id: uuidv4(),
      lat: 51.25493934706946,
      lng: 7.260912987519032,
      hovered: false,
      title: 'Mollis Non Cursus Company',
      desc: 'mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras',
      meta: 'Ap #630-2057 Cursus. St.'
    },
    {
      id: uuidv4(),
      lat: 51.2457701857236,
      lng: 7.220829229439893,
      hovered: false,
      title: 'Quis Tristique Incorporated',
      desc: 'malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna.',
      meta: '627-2045 Blandit St.'
    },
    {
      id: uuidv4(),
      lat: 51.255677764378085,
      lng: 7.198609573469284,
      hovered: false,
      title: 'Nam Porttitor Scelerisque Corporation',
      desc: 'nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem',
      meta: '955-292 Pulvinar Av.'
    },
    {
      id: uuidv4(),
      lat: 51.2005652588738,
      lng: 7.228385442919663,
      hovered: false,
      title: 'Quam Vel Sapien Institute',
      desc: 'varius et, euismod et, commodo at, libero. Morbi accumsan laoreet',
      meta: '6739 Ultricies Street'
    }
  ],
  selectedMarker: null
};

const marker = (state = initialState, action) => {
  switch (action.type) {
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

    case types.SELECT_MARKER:
      return Object.assign({}, state, {
        selectedMarker: state.list.find(marker => marker.id === action.id)
      });

    default:
      return state;
  }
};

export default marker;

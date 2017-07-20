import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from 'actions/googleActions';
import * as markerActions from 'actions/markerActions';

class Places extends Component {
  constructor(props) {
    super(props);
    this.initPlacesApi = this.initPlacesApi.bind(this);
    this.createEventListener = this.createEventListener.bind(this);
    this.doNearbySearch = this.doNearbySearch.bind(this);
  }

  /**
   * When the component mounts, initialize the places api and create all event listeners.
   */
  componentDidMount() {
    const { map, placesService } = this.props;
    if (map && !placesService) {
      this.initPlacesApi();
      this.createEventListener();
    }
  }

  /**
   * When the component has received new props and state, check if we have a valid map property and no places service
   * initialized. If this is the case, call the init method and create all event listeners.
   * @param {object} prevProps - Previous props of the component.
   * @param {object} prevState - Previous state of the component.
   */
  componentDidUpdate(prevProps, prevState) {
    const { map, placesService } = this.props;
    
    if (map && prevProps.map !== map && !placesService) {
      this.initPlacesApi();
      this.createEventListener();
    }
  }

  /**
   * When the component unmounts remove all event listeners.
   */
  componentWillUnmount() {
    this.removeEventListener();
  }

  /**
   * Initializes the places api and saves it globally.
   */
  initPlacesApi() {
    const { google, actions, map } = this.props;
    // init the places service & save it in the global redux store
    actions.savePlacesService(new google.maps.places.PlacesService(map));
    process.env.TWT_APP_DEBUG && console.log(`%cPlaces API:`,'font-weight:bold;',`Successfully initialized!`);
  }

  /**
   * Create all event listener fr 
   */
  createEventListener() {
    const { map } = this.props;
    if (map) {
      this.idleListener = map.addListener('idle', this.doNearbySearch);
      process.env.TWT_APP_DEBUG && console.log(`%cPlaces API:`,'font-weight:bold;',`Event listener created!`);
    }
  }

  /**
   * Remove Google Maps event listener.
   */
  removeEventListener() {
    this.idleListener.remove();
  }

  /**
   * Does a nearby search.
   * https://developers.google.com/maps/documentation/javascript/places?hl=de#place_search_requests
   */
  doNearbySearch() {
    process.env.TWT_APP_DEBUG && console.log(`%cPlaces API:`,'font-weight:bold;',`Do a nearby search...`);
    const { map, placesService, actions } = this.props;
    actions.toggleMapLoading(true);

    // Places request configuration object
    const request = {
      location: map.getCenter(),
      radius: '5000',
      types: ['store']
    };

    // Do the search...
    placesService.nearbySearch(request, (results, status) => {
      if (status === 'OK') {
        actions.replaceMarkersWithNew(results);
        actions.toggleMapLoading(false);
        process.env.TWT_APP_DEBUG && console.log(`%cPlaces API:`,'font-weight:bold;',`...nearby search finished!`);
      }
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    google: state.google.lib,
    map: state.google.map,
    placesService: state.google.placesService
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, mapActions, markerActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Places);

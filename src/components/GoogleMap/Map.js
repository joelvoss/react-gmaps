import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from './../../actions/googleActions';

const MapWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

class Map extends Component {
  constructor(props) {
    super(props);

    this.handleIdle = this.handleIdle.bind(this);
  }

  /**
   * React lifecycle method.
   * When the map mounts, initialize the Google Map.
   * @returns {void}
   */
  componentDidMount() {
    const { google, actions } = this.props;

    // basic map configuration
    const zoom = 11;
    this.location = new google.maps.LatLng(51.2419782, 7.0937274);
    const center = this.location;
    const mapConfig = {
      center,
      zoom
    };

    // init the google maps & save it in the global redux store
    actions.saveMap(new google.maps.Map(this.root, mapConfig)); 
  }

  /**
   * React lifecycle method.
   * When the component unmounts remove all event listeners.
   * @returns {void}
   */
  componentWillUnmount() {
    this.removeEventListener();
  }

  /**
   * React lifecycle method.
   * When the component did update, check if we have a valid maps property (e.g. it is initialized)
   * create its eventlisteners and init the places service.
   * @param {any} prevProps - Previous properties
   * @param {any} prevState - Previous state
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    const { google, map, actions } = this.props;
    if (prevProps.map !== map) {
      // init the places service & save it in the global redux store
      actions.savePlacesService(new google.maps.places.PlacesService(map));
      // create map event listener
      this.createEventListener();
    }
  }

  /**
   * Create Google Maps event listener.
   * @returns {void}
   */
  createEventListener() {
    const { map } = this.props;
    console.log('create event listener', map);
    if (map) {
      map.addListener('idle', this.handleIdle);
    }
  }

  /**
   * Remove Google Maps event listener.
   * @returns {void}
   */
  removeEventListener() {
    const { map } = this.props;
    if (map) {
      map.removeListener('idle', this.handleIdle);
    }
  }

  /**
   * Handle the Google Maps "idle" event.
   * @returns {void}
   */
  handleIdle() {
    const { placesService } = this.props;
    // Todo: create marker...
    console.log('Todo: create marker...', placesService);

    const request = {
      location: this.location,
      radius: '500',
      types: ['store']
    };

    placesService.nearbySearch(request, (results, status) => {
      console.log('places search finished', results, status);
    });
  }
  
  render() {
    const { children } = this.props;

    return (
      <MapWrapper innerRef={c => this.root = c}>
        {
          children
        }
      </MapWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loaded: state.google.loaded,
    google: state.google.lib,
    map: state.google.map,
    placesService: state.google.placesService
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

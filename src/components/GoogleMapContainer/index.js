import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Google Library Service
import GoogleLibraryService from 'utilities/GoogleLibraryService';
import GeolocationService from 'utilities/GeolocationService';

import Wrapper from './Wrapper';
import LoadingOverlay from 'components/LoadingOverlay';
import Map, { MapEventService } from './Map';

/**
 * This component represents the Google Maps Wrapper.
 * It loads the Google Maps API asynchronously. As long as we are loading the api, it displays a loading overlay above
 * the map component
 */
class GoogleMapContainer extends Component {
  // PropTypes
  static propTypes = {
    config: PropTypes.object.isRequired
  };

  static defaultProps = {
    config: {},
    subscriptions: []
  }

  // State
  state = {
    loading: true,
    error: false,
    google: null,
    map: null,
    places: null,
    position: {
      lat: 51.2419782,
      lng: 7.0937274
    }
  };

  /**
   * Lifecycle hook that fires, when the component mounts for the first time.
   */
  async componentDidMount() {
    const { config, subscriptions } = this.props;

    try {
      // Start geolocation, of the config has specified it
      if (config.geolocation) {
        process.env.TWT_APP_DEBUG &&
          console.log(`%cGoogleMapContainer:`, 'font-weight:bold;', `Subscribe to watchPosition`);

        // Subscribe to the navigator.geolocation watchPosition observable
        // This observable actually never "completes", so the complete callback is omitted.
        subscriptions.push(GeolocationService(config.geolocation).subscribe(
          position => this.setState({ position }),
          error => this.setState({ error })
        ));
      }

      // Load the google maps library
      process.env.TWT_APP_DEBUG &&
        console.log(`%cGoogleMapContainer:`, 'font-weight:bold;', `Load the google maps library.`);

      const google = await GoogleLibraryService(config);

      // Initialize the map
      process.env.TWT_APP_DEBUG &&
        console.log(
          `%cGoogleMapContainer:`,
          'font-weight:bold;',
          `Initialize Map with pos: lat ${this.state.position.lat}; lng ${this.state.position.lng}.`
        );

      const map = await new google.maps.Map(this.mapRef, {
        zoom: config.map.zoom,
        center: { lat: this.state.position.lat, lng: this.state.position.lng }
      });

      // Initialize the places library
      process.env.TWT_APP_DEBUG &&
        console.log(`%cGoogleMapContainer:`, 'font-weight:bold;', `Initialize the places library.`);

      const places = await new google.maps.places.PlacesService(map);

      // Subscribe to different map events, e.g. 'idle'.
      subscriptions.push(MapEventService({ map, places }).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.error(error);
        }
      ));

      this.setState({
        google,
        map,
        places
      });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  /**
   * Lifecycle hook that fires on every prop or state update.
   * @param {object} prevProps - Previous props.
   * @param {object} prevState - Previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    const { position, map } = this.state;
    // if we have a valid map object and the position lat/lng values changed,
    // update the map position
    if (map && JSON.stringify(position) !== JSON.stringify(prevState.position)) {
      this.updateMapCenter({ lat: position.lat, lng: position.lng });
    }
  }

  /**
   * Clean up when the component unmounts.
   */
  componentWillUnmount() {
    const { subscriptions } = this.props; 
    for (let i = 0; i < subscriptions.length; i++) {
      subscriptions[i].unsubscribe();
    }
  }

  /**
   * Updates the current center position of the google map
   */
  updateMapCenter = position => {
    const { map } = this.state;

    process.env.TWT_APP_DEBUG &&
      console.log(
        `%cGoogleMapContainer:`,
        'font-weight:bold;',
        `Update map position to lat ${position.lat}; lng ${position.lng}`
      );

    map.setCenter(position);
  };

  render() {
    const { config } = this.props;
    const { loading } = this.state;

    return (
      <Wrapper minHeight={config.map.height}>
        <LoadingOverlay show={loading} />
        <Map innerRef={c => (this.mapRef = c)}>
          {/* Place Marker here  */}
        </Map>
      </Wrapper>
    );
  }
}

// connect current component with redux state
export default GoogleMapContainer;

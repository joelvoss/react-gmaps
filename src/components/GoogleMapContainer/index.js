import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Google Library Service
import GoogleLibraryService from 'utilities/GoogleLibraryService';
import GeolocationService from 'utilities/GeolocationService';
import MapEventService from 'utilities/MapEventService';
import nearbySearch from 'utilities/nearbySearch';

import Wrapper from './Wrapper';
import LoadingOverlay from 'components/LoadingOverlay';
import Map from './Map';
import OverviewLayer from './OverviewLayer';

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
  };

  // State
  state = {
    loading: true,
    error: false,
    google: null,
    map: null,
    position: {
      lat: 51.2419782,
      lng: 7.0937274
    },
    marker: null
  };

  /**
   * Lifecycle hook that fires, when the component mounts for the first time.
   * We use async/await in the mounting process.
   */
  async componentDidMount() {
    const { config, subscriptions } = this.props;

    try {
      // Start geolocation, of the config has specified it.
      // We do this as the first thing, because the use location is a vital information
      // and doesn't rely on the google api.
      if (config.geolocation) {
        // Subscribe to the navigator.geolocation watchPosition observable
        // This observable actually never "completes", so the complete callback is omitted.
        subscriptions.push(
          GeolocationService(config.geolocation).subscribe(
            position => this.setState({ position }),
            error => this.setState({ error })
          )
        );
      }

      // Load the google maps library
      const google = await GoogleLibraryService(config);

      // Initialize the map
      const map = await new google.maps.Map(this.mapRef, {
        zoom: config.map.zoom,
        center: { lat: this.state.position.lat, lng: this.state.position.lng }
      });

      // Initialize all libraries, that the user specified in the config.
      // We may need specific libraries later on, so we safe them in the
      // usedLibraries
      const usedLibraries = {};
      if (config.libraries && config.libraries.indexOf('places') !== -1) {
        usedLibraries['places'] = await new google.maps.places.PlacesService(map);
      }

      // Subscribe to different map events, e.g. 'idle'.
      const eventService = new MapEventService({ map, google });
      const idleEvent = eventService.createEvent('idle');
      subscriptions.push(
        idleEvent.subscribe(() => {
          nearbySearch({ map, places: usedLibraries['places'] })
            .then(results => {
              this.setState({
                marker: results
              });
            })
            .catch(err => console.error(err));
        })
      );

      this.setState({
        google,
        map,
        loading: false
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
   * Updates the current center position of the google map.
   * @param {object} - Position object, consists of a lat and lng value.
   */
  updateMapCenter = position => {
    const { map } = this.state;
    map.setCenter(position);
  };

  render() {
    const { config } = this.props;
    const { google, map, loading, marker } = this.state;

    return (
      <Wrapper minHeight={config.map.height}>
        <LoadingOverlay show={loading} />
        <Map innerRef={c => (this.mapRef = c)}>
          {/* Place Marker here  */
          marker &&
            marker.map(m => {
              return (
                <OverviewLayer
                  key={m.id}
                  google={google}
                  map={map}
                  data={{
                    lat: m.geometry.location.lat,
                    lng: m.geometry.location.lng,
                    id: m.id
                  }}
                />
              );
            })}
        </Map>
      </Wrapper>
    );
  }
}

// connect current component with redux state
export default GoogleMapContainer;

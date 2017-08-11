import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Google Library Service
import GoogleLibraryService from 'utilities/GoogleLibraryService';
import GeolocationService from 'utilities/GeolocationService';
import MapEventService from 'utilities/MapEventService';
import nearbySearch from 'utilities/nearbySearch';

import Wrapper from './Wrapper';
import LoadingOverlay from 'components/LoadingOverlay';
import InfoModal from './InfoModal';
import Map from './Map';
import OverlayView from './OverlayView';

import { GeolocationLoading, GeolocationError } from 'components/GeolocationComponents';

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

  // Default props
  static defaultProps = {
    subscriptions: []
  };

  // State
  state = {
    loading: true,
    error: false,
    google: null,
    map: null,
    position: {
      loading: true,
      error: false,
      message: '',
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
          GeolocationService(config.geolocation).subscribe(success =>
            this.handleGeolocationSuccess(success)
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
      // We may need specific libraries later on, so we safe them in the usedLibraries object.
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

  /**
   * Handles the success callback of the geolocationservice subscriptions and its
   * different states (pending, success, error and complete)
   * @param {object} action - The action object of the success callback.
   */
  handleGeolocationSuccess = action => {
    switch (action.type) {
      // Handle the pending action.
      case 'pending':
        this.setState(state => {
          return {
            position: {
              ...state.position,
              loading: true,
              error: false,
              message: action.payload
            }
          };
        });
        break;

      // Handle the success action.
      case 'success':
        this.setState(state => {
          return {
            position: {
              ...state.position,
              ...action.payload,
              loading: false
            }
          };
        });
        break;

      // Handle the error action.
      case 'error':
        console.log('geolocation error');
        this.setState(state => {
          return {
            position: {
              ...state.position,
              error: true,
              message: action.payload
            }
          };
        });
        break;

      // Handle the complete action.
      case 'complete':
        this.setState(state => {
          return {
            position: {
              ...state.position,
              loading: false
            }
          };
        });
        break;

      default:
        break;
    }
  };

  handleMapsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e, 'handleMapsClick');
  }

  handleOverlayClick = markerId => {
    const { marker } = this.state;

    // iterate over each marker and
    const index = marker.findIndex(m => m.id === markerId);
    
    this.setState(state => {
      return {
        marker: [
          ...state.marker.slice(0, index), // everything before the clicked marker
          {...state.marker[index], infoWindowOpen: true},
          ...state.marker.slice(index + 1) // everything after the clicked marker
        ]
      };
    });
  }

  /**
   * React lifecycle method.
   * This method renders the actual ui.
   * @returns {jsx} - Component UI
   */
  render() {
    const { config } = this.props;
    const { google, map, loading, marker, position } = this.state;

    return (
      <Wrapper minHeight={config.map.height}>
        {/* Map LoadingOverlay  */}
        <LoadingOverlay show={loading} />

        {/* InfoModal */}
        <InfoModal show={position.loading}>
          {/* A loading component for the info modal */}
          <GeolocationLoading visible={!position.error} message={position.message} />
          {/* A error component for the info modal */}
          <GeolocationError visible={position.error} message={position.message} />
        </InfoModal>

        {/* The actual map component */}
        <Map innerRef={c => (this.mapRef = c)} onClick={this.handleMapsClick}>
          {/* Place Marker here */
          marker &&
            marker.map(m => {
              if (m.infoWindowOpen) {
                console.log(m.id);
              }
              return (
                <OverlayView
                  key={m.id}
                  google={google}
                  map={map}
                  data={m}
                  handleOverlayClick={this.handleOverlayClick}
                />
              )
            })
          }
        </Map>
      </Wrapper>
    );
  }
}

// connect current component with redux state
export default GoogleMapContainer;

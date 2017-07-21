import React, { Component } from 'react';

const withGeolocation = (props = {}) => WrappedComponent => {
  // Set default options
  const userDecisionTimeout = props.userDecisionTimeout || null;
  const geolocationProvider = typeof navigator !== 'undefined' && navigator.geolocation;

  return class GeolocationService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        geolocationCoords: null,
        geolocationAvailable: Boolean(geolocationProvider),
        geolocationEnabled: true, // be optimistic
        geolocationPositionError: null
      };

      this.onPositionError = this.onPositionError.bind(this);
      this.onPositionSuccess = this.onPositionSuccess.bind(this);
      this.cancelUserDecisionTimeout = this.cancelUserDecisionTimeout.bind(this);
    }

    /**
     * Check if the geolocation provider is available and query the current location.
     * If the user does not respond to the geolocation permission request, abort the
     * location query and display an error (only of we specified a timout).
     * @throws {Error} - May throw an error, of the geolocation provider is invalid.
     */
    componentDidMount() {
      const { geolocationAvailable } = this.state;
      if (!geolocationAvailable || !geolocationProvider.getCurrentPosition) {
        throw new Error('The provided geolocation provider is invalid');
      }

      if (userDecisionTimeout) {
        this.userDecisionTimeoutId = setTimeout(() => {
          this.onPositionError();
        }, userDecisionTimeout);
      }

      process.env.TWT_APP_DEBUG && console.log(`%cGeolocation API:`, 'font-weight:bold;', `Fetch current location...`);

      geolocationProvider.getCurrentPosition(this.onPositionSuccess, this.onPositionError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      });
    }

    /**
     * Clean up!
     */
    componentWillUnmount() {
      this.cancelUserDecisionTimeout();
    }

    /**
     * Clears the user decision timeout.
     */
    cancelUserDecisionTimeout() {
      if (this.userDecisionTimeoutId) {
        clearTimeout(this.userDecisionTimeoutId);
      }
    }

    /**
     * On error, clear the user decision timeout and set the error state.
     * @param {PositionError} positionError - The position error.
     */
    onPositionError(positionError) {
      process.env.TWT_APP_DEBUG &&
        console.error(`%cGeolocation API:`, 'font-weight:bold;', `Failed to fetch location coordinates.`);
      this.cancelUserDecisionTimeout();
      this.setState({
        geolocationCoords: null,
        geolocationEnabled: false,
        geolocationPositionError: positionError
      });
    }

    /**
     * On success, clear the user decision timeout and set the success state.
     * @param {Position} position - The position object containing the current user coordinates.
     */
    onPositionSuccess(position) {
      process.env.TWT_APP_DEBUG &&
        console.log(`%cGeolocation API:`, 'font-weight:bold;', `Successfully fetched location!`);
      this.cancelUserDecisionTimeout();
      this.setState({
        geolocationCoords: position.coords,
        geolocationEnabled: true,
        geolocationPositionError: null
      });
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
};

export default withGeolocation;

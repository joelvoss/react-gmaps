import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import combinedActions from 'actions/index';

import Wrapper from './Wrapper';
import LoadingOverlay from 'components/LoadingOverlay';
import Map from './Map';

/**
 * This component represents the Google Maps Wrapper.
 * It loads the Google Maps API asynchronously. As long as we are loading the api, it displays a loading overlay above
 * the map component
 */
class GoogleMapContainer extends Component {
  // PropTypes
  static propTypes = {
    config: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    google: PropTypes.object,
    loading: PropTypes.bool.isRequired
  };

  /**
   * Just to be sure we check if the google prop is already loaded when the component mounts.
   * If its loaded, save it globally. The same applies for the map configuration property.
   */
  componentDidMount() {
    const { config, actions } = this.props;

    if (config) {
      // save current map config globally
      actions.saveMapConfig(config);
      // load google maps <script>, if window.google is not available
      actions.loadGoogleMapsLibrary(config);
      // geolocate the user
      actions.startGeolocation(config);
    }
  }

  render() {
    const { loading, config } = this.props;

    return (
      <Wrapper minHeight={config.map.height}>
        <LoadingOverlay show={loading} />
        {/*{google && <Map google={google} />}*/}
      </Wrapper>
    );
  }
}

// Map redux state to props
const mapStateToProps = state => {
  return {
    loading: state.google.loading,
    google: state.google.lib
  };
};
// Map dispatch method to all action creators
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(combinedActions, dispatch)
});

// connect current component with redux state
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapContainer);

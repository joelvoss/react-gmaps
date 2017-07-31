import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as googleActions from 'actions/googleActions';

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
    config: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.loadGoogleLibrary = this.loadGoogleLibrary.bind(this);
  }
  /**
   * Just to be sure we check if the google prop is already loaded when the component mounts.
   * If its loaded, save it globally. The same applies for the map configuration property.
   */
  componentDidMount() {
    const { config, actions } = this.props;
    // enable loading animation
    actions.toggleMapLoading(true);

    if (config) {
      // save current map config globally
      actions.saveMapConfig(config);

      // load google maps <script>, if window.google is not available
      actions.loadGoogleMapsLibrary(config);
    }

    // disable loading animation
    actions.toggleMapLoading(false);
  }

  loadGoogleLibrary() {
    console.log('loading google library...');

  }

  render() {
    const { google, loading, config } = this.props;

    return (
      <Wrapper minHeight={config.map.height}>
        <LoadingOverlay show={loading} />
        {google && <Map />}
      </Wrapper>
    );
  }
}

// Map redux state to props
const mapStateToProps = state => {
  return {
    loading: state.google.loading,
    google: state.google.lib,
    marker: state.marker.list
  };
};
// Map dispatch method to all action creators
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(googleActions, dispatch)
});

// connect current component with redux state
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapContainer);

// export default withGoogleMap({
//   apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
// })(GoogleMapContainer);

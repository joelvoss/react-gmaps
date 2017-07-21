import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as googleActions from 'actions/googleActions';

import withGoogleMap from 'components/withGoogleMap';
import Wrapper from './Wrapper';
import LoadingOverlay from 'components/LoadingOverlay';
import Map from './Map';

/**
 * This component represents the Google Maps Wrapper.
 * It loads the Google Maps API asynchronously. As long as we are loading the api, it displays a loading overlay above
 * the map component
 */
class GoogleMap extends Component {
  /**
   * When the component receives new props we diff them against the old ones.
   * If they changed we save them globally.
   * @param {object} newProps - The new props.
   */
  componentWillReceiveProps(newProps) {
    const { config, gLib, actions } = this.props;
    if (newProps.gLib && newProps.gLib !== gLib) {
      actions.saveGoogle(newProps.gLib);
    }
    if (newProps.config && JSON.stringify(newProps.config) !== JSON.stringify(config)) {
      actions.saveMapConfig(newProps.config);
    }
  }

  /**
   * Just to be sure we check if the google prop is already loaded when the component mounts.
   * If its loaded, save it globally. The same applies for the map configuration property.
   */
  componentDidMount() {
    const { config, gLib, google, actions } = this.props;

    actions.toggleMapLoading(true);

    if (google && gLib !== google) {
      actions.saveGoogle(google);
    }
    if (config) {
      actions.saveMapConfig(config);
    }

    actions.toggleMapLoading(false);
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
const GoogleMapContainer = connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

export default withGoogleMap({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
})(GoogleMapContainer);

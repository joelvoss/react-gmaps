import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from 'actions/googleActions';

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
   * When the component receives new props, check if the google prop is loaded and/or changed and save it globally.
   * @param {object} newProps - The new props. 
   */
  componentWillReceiveProps(newProps) {
    const { google, actions } = this.props;
    if (newProps.gLib && newProps.gLib !== google) {
      // save google globally
      actions.saveGoogle(newProps.gLib);
    }
  }

  /**
   * Just to be sure whe check if the google prop is already loaded when the component mounts.
   * If its loaded, save it globally.
   */
  componentDidMount() {
    const { google, actions } = this.props;
    if (google) {
      // save google globally
      actions.saveGoogle(google);
    }
  }

  render() {
    const { loaded } = this.props;

    return (
      <Wrapper>
        <LoadingOverlay show={!loaded} />
        {loaded && <Map />}
      </Wrapper>
    );
  }
}

// Map redux state to props
const mapStateToProps = state => {
  return {
    loaded: state.google.loaded,
    google: state.google.lib,
    marker: state.marker.list
  };
};
// Map dispatch method to all action creators
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch)
});

// connect current component with redux state
const GoogleMapContainer = connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

export default withGoogleMap({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
})(GoogleMapContainer);

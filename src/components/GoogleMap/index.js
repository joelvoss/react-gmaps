import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from './../../actions/googleActions';

import withGoogleMap from './../withGoogleMap';
import Wrapper from './Wrapper';
import LoadingOverlay from './../LoadingOverlay';
import Map from './Map';
import Marker from './Marker';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    const { google, actions } = this.props;
    if ( newProps.gLib && (newProps.gLib !== google)) {
      // save google globally
      actions.saveGoogle(newProps.gLib);
    }
  }

  componentDidMount () {
    const { google, actions } = this.props;
    if ( google) { 
      // save google globally
      actions.saveGoogle(google);
    }
  }

  render() {
    const { loaded, marker } = this.props;

    return (
      <Wrapper>
        <LoadingOverlay show={!loaded} />
        {
          loaded && <Map />
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loaded: state.google.loaded,
    google: state.google.lib,
    marker: state.marker.list
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch)
});

const GoogleMapContainer = connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

export default withGoogleMap({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
})(GoogleMapContainer);

import React, { Component } from 'react';
import withGoogleMap from './../withGoogleMap';
import Wrapper from './Wrapper';
import LoadingOverlay from './../LoadingOverlay';
import Map from './Map';
import Marker from './Marker';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      google: null
    };
  }

  componentWillReceiveProps (newProps) {
    if ( newProps.gmapLoaded && (newProps.gmapLoaded !== this.props.gmapLoaded)) {
      this.setState(() => ({
        loaded: newProps.gmapLoaded,
        google: newProps.google
      }));
    }
  }

  componentDidMount () {
    const { gmapLoaded, google } = this.props;
    if ( gmapLoaded && google) {
      this.setState(() => ({
        loaded: gmapLoaded,
        google
      }));
    }
  }

  render() {
    const { loaded, google } = this.state;
    return (
      <Wrapper>
        <LoadingOverlay show={!loaded} />
        {
          google &&
          <Map google={google}>
            <Marker lat={51.2419782} lng={7.0937274}/>
          </Map>
        }
      </Wrapper>
    );
  }
}

export default withGoogleMap({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
})(GoogleMap);

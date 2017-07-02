import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { marker } = this.props;

    return (
      <Wrapper>
        <LoadingOverlay show={!loaded} />
        {
          google &&
          <Map google={google}>
            {
              marker && marker.map(m => <Marker key={m.id} {...m}/>)
            }
          </Map>
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    marker: state.marker.list
  }
}

const GoogleMapContainer = connect(mapStateToProps)(GoogleMap);

export default withGoogleMap({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I'
})(GoogleMapContainer);

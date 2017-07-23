import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from 'actions/googleActions';
import * as markerActions from 'actions/markerActions';

import withGeolocation from 'components/withGeolocation';
import Places from 'components/GoogleMap/Places';
import MapWrapper from './MapWrapper';
import OverlayView from 'components/GoogleMap/OverlayView';

class Map extends Component {
  /**
   * When the map mounts, initialize the actual google map.
   */
  componentDidMount() {
    const { google, actions, map } = this.props;
    // basic map configuration
    const mapConfig = {
      center: new google.maps.LatLng(process.env.TWT_APP_MAP_CENTER_LAT, process.env.TWT_APP_MAP_CENTER_LNG),
      zoom: parseInt(process.env.TWT_APP_MAP_ZOOM, 10)
    };

    // init the google maps & save it in the global redux store
    // only if we havent already done it
    if (!map) {
      this.newMap = new google.maps.Map(this.root, mapConfig);
      actions.saveMap(this.newMap);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.geolocationCoords !== this.props.geolocationCoords) {
      const { google, map } = this.props;
      const { geolocationCoords } = nextProps;
      const newLocation = new google.maps.LatLng(geolocationCoords.latitude, geolocationCoords.longitude);
      map.setCenter(newLocation);
    }
  }

  render() {
    const { marker } = this.props;

    return (
      <MapWrapper innerRef={c => (this.root = c)}>
        <Places />
        {marker &&
          marker.map((item, i) => {
            return (
              <OverlayView
                key={item.place_id}
                markerId={item.place_id}
                i={i}
                lat={item.geometry.location.lat}
                lng={item.geometry.location.lng}
              />
            );
          })}
      </MapWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    google: state.google.lib,
    map: state.google.map,
    marker: state.marker.list
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, mapActions, markerActions), dispatch)
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default withGeolocation({ userDecisionTimeout: 10000 })(MapContainer);

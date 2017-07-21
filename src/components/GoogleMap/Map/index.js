import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from 'actions/googleActions';
import * as markerActions from 'actions/markerActions';

import Places from 'components/GoogleMap/Places';
import MapWrapper from './MapWrapper';
import Marker from 'components/GoogleMap/Marker';

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

  render() {
    const { marker } = this.props;

    return (
      <MapWrapper innerRef={c => (this.root = c)}>
        <Places />
        {marker &&
          marker.map(item => {
            return (
              <Marker
                key={item.place_id}
                markerId={item.place_id}
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);

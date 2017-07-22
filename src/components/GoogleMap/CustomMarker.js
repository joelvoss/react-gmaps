import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as markerActions from 'actions/markerActions';

class CustomMarker extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.draw = this.draw.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const { google, map } = this.props;
    
    if (google && map) {
      this.overlayView = new google.maps.OverlayView();
      this.overlayView.onAdd = this.onAdd;
      this.overlayView.draw = this.draw;
      this.overlayView.onRemove = this.onRemove;
      this.overlayView.setMap(map);
    }
  }

  componentWillUnmount() {
    this.overlayView.setMap(null);
  }

  onAdd() {
    const { markerId } = this.props;
  
    if (!this.div) {
      this.div = document.createElement('div');

      this.div.className = 'custom-map-marker';

      this.div.style.position = 'absolute';
      this.div.style.cursor = 'pointer';
      this.div.style.width = '20px';
      this.div.style.height = '20px';
      this.div.style.background = '#ed2461';
      this.div.style.border = '2px solid #fbd4e1';
      this.div.style.borderRadius = '50%';
      this.div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

      if (markerId) {
        this.div.dataset.markerId = markerId;
      }

      const panes = this.overlayView.getPanes();
      panes.overlayImage.appendChild(this.div);
    }
  }

  draw() {
    const { google, lat, lng } = this.props;

    const latlng = new google.maps.LatLng(lat, lng);
    const point = this.overlayView.getProjection().fromLatLngToDivPixel(latlng);
	
    if (point) {
      this.div.style.left = point.x + 'px';
      this.div.style.top = point.y + 'px';
    }
  }

  onRemove() {
    console.log('onRemove');
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }

  render() {
    return null;
  }
}

// Maps redux state to props.
const mapStateToProps = state => {
  return {
    google: state.google.lib,
    map: state.google.map,
    mapConfig: state.google.config
  };
};

// Maps dispatch method to props.
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomMarker);

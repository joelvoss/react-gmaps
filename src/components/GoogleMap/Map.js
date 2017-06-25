import React, { Component } from 'react';

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    const { google } = this.props;

    const zoom = 14;
    const lat = 37.774929;
    const lng = -122.419416;
    const center = new google.maps.LatLng(lat, lng);

    const mapConfig = Object.assign({}, {
      center: center,
      zoom: zoom
    });

    this.map = new google.maps.Map(this.root, mapConfig);
  }
  
  render() {
    return (
      <div style={{width: '100%', height: '400px'}} ref={c => this.root = c}></div>
    );
  }
}

export default Map;

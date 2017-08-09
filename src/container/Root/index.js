import React, { Component } from 'react';
import Media from 'react-media';

import Wrapper from './Wrapper';
import H1 from './H1';
import Box from './Box';
import GoogleMapContainer from 'components/GoogleMapContainer';
import MarkerList from 'components/MarkerList';

// Basic map configuration object
const mapConfig = {
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I',
  map: {
    zoom: 14,
    height: 600
  },
  icons: {
    info: {
      normal: require('globalAssets/markerIcons/info_normal.svg'),
      hovered: require('globalAssets/markerIcons/info_hovered.svg')
    }
  },
  geolocation: {
    lat: 51.2419782,
    lng: 7.0937274,
    timeout: 5000
  },
  libraries: ['places']
}

class Root extends Component {
  render() {
    return (
      <Media query="(min-width: 375px)">
        {matches =>
          matches
            ? <Wrapper>
                <H1>React + GMaps</H1>
                <Box>
                  <MarkerList />
                  <GoogleMapContainer
                    config={mapConfig}
                  />
                </Box>
              </Wrapper>
            : <p>
                <strong>Todo:</strong>The document is at less than 375px wide.
              </p>}
      </Media>
    );
  }
}

export default Root;

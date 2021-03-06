import React, { Component } from 'react';
import Media from 'react-media';

import Wrapper from './Wrapper';
import H1 from './H1';
import Box from './Box';
import GoogleMapContainer from 'components/GoogleMapContainer';
import Sidebar from 'components/Sidebar';

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
    timeout: 5000,
    radius: 5000
  },
  libraries: ['places']
}

class Root extends Component {

  // The global state of our application
  // We could use a redux to store our global app state, but for the sake of
  // simplicity we manage our global state by component composition.
  state = {
    position: {
      lat: mapConfig.geolocation.lat,
      lng: mapConfig.geolocation.lng,
      radius: mapConfig.geolocation.radius
    }
  }

  /**
   * Global method to update the global position object.
   * @param {object} position - The position object containing the lat and lng properties.
   */
  savePositionGlobally = position => {
    this.setState(state => {
      return {
        globalPosition: {
          ...state.position,
          ...position
        }
      };
    });
  }

  render() {
    return (
      <Media query="(min-width: 415px)">
        {matches =>
          matches
            ? <Wrapper>
                <H1>React + GMaps</H1>
                <Box>
                  <Sidebar 
                    config={mapConfig}
                    globalState={this.state}
                  />
                  <GoogleMapContainer
                    config={mapConfig}
                    savePositionGlobally={this.savePositionGlobally}
                  />
                </Box>
              </Wrapper>
            : <p>
                <strong>Todo:</strong>The document is at less than 415px wide.
              </p>}
      </Media>
    );
  }
}

export default Root;

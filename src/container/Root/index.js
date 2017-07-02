import React, { Component } from 'react';
import Wrapper from './Wrapper';
import H1 from './H1';
import Box from './Box';
import GoogleMapContainer from './../../components/GoogleMap';
import MarkerList from './../../components/MarkerList';

class Root extends Component {
  render() {
    return (
      <Wrapper>
        <H1>React + GMaps</H1>
        <Box>
          <MarkerList />
          <GoogleMapContainer />
        </Box>
      </Wrapper>
    );
  }
}

export default Root;

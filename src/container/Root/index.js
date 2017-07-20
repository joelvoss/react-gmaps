import React, { Component } from 'react';
import Media from 'react-media';

import Wrapper from './Wrapper';
import H1 from './H1';
import Box from './Box';
import GoogleMapContainer from 'components/GoogleMap';
import MarkerList from 'components/MarkerList';

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
                  <GoogleMapContainer />
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

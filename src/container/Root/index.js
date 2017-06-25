import React, { Component } from 'react';
import Wrapper from './Wrapper';
import H1 from './H1';
import GoogleMap from './../../components/GoogleMap';

class Root extends Component {

  render() {
    return (
      <Wrapper>
        <H1>React + GMaps</H1>
        <GoogleMap />
      </Wrapper>
    );
  }
}

export default Root;

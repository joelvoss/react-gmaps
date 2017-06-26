import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Wrapper from './Wrapper';
import H1 from './H1';
import GoogleMap from './../../components/GoogleMap';
import List from './../../components/List';

class Root extends Component {
  render() {
    const marker = [
      { id: uuidv4(), lat: 51.271404538893385, lng: 7.124785666335966 },
      { id: uuidv4(), lat: 51.21842795892962, lng: 7.238430837129359 },
      { id: uuidv4(), lat: 51.21842795892962, lng: 7.238430837129359 },
      { id: uuidv4(), lat: 51.24209689453857, lng: 6.994760000496646 },
      { id: uuidv4(), lat: 51.226764362991865, lng: 7.012966459674857 },
      { id: uuidv4(), lat: 51.25309333768975, lng: 7.110313389412997 },
      { id: uuidv4(), lat: 51.228569717053425, lng: 7.0157762934532535 },
      { id: uuidv4(), lat: 51.25493934706946, lng: 7.260912987519032 },
      { id: uuidv4(), lat: 51.2457701857236, lng: 7.220829229439893 },
      { id: uuidv4(), lat: 51.255677764378085, lng: 7.198609573469284 },
      { id: uuidv4(), lat: 51.2005652588738, lng: 7.228385442919663 },
    ];

    return (
      <Wrapper>
        <H1>React + GMaps</H1>
        <GoogleMap marker={marker} />
        <List marker={marker} />
      </Wrapper>
    );
  }
}

export default Root;

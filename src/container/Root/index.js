import React, { Component } from 'react';
import withScripts from './../../components/withScripts';
import GmapsUrl from './../../helper/GmapsUrl';
import Wrapper from './Wrapper';
import H1 from './H1';

class Root extends Component {

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    console.log(this.props);
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        console.log('gmaps is loaded (componentWillReceiveProps)');
      }
      else {
        console.log('gmaps failed to load (componentWillReceiveProps)');
      }
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log('gmaps is loaded');
    }
  }

  render() {
    return (
      <Wrapper>
        <H1>React + GMaps</H1>
        {
          window.google &&
          <p>Google Maps API loaded!</p>
        }
      </Wrapper>
    );
  }
}

export default withScripts(GmapsUrl({
  apiKey: 'AIzaSyCej5h4pGqaunT1C8iM9QAle3A8N4Edf8I',
}))(Root);

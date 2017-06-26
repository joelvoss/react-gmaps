import React, { Component } from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      children: null
    };

    this.initMap = this.initMap.bind(this);
    this.createChildren = this.createChildren.bind(this);
    this.handleIdle = this.handleIdle.bind(this);
  }

  /**
   * React lifecycle method.
   * When the map mounts, initialize the Google Map.
   * @returns {void}
   */
  componentDidMount() {
    this.initMap();
  }

  /**
   * React lifecycle method.
   * When the component unmounts remove all event listeners.
   * @returns {void}
   */
  componentWillUnmount() {
    this.removeEventListener();
  }

  /**
   * Initialize a Google Map instance.
   */
  initMap() {
    const { google } = this.props;

    // basic map configuration
    const zoom = 12;
    const center = new google.maps.LatLng(51.2419782, 7.0937274);
    const mapConfig = {
      center,
      zoom
    };

    // initialize the map
    this.map = new google.maps.Map(this.root, mapConfig);
    
    // create all google event listeners
    this.createEventListener();

    // set the state
    this.setState(() => ({
      loaded: true
    }));
  }

  /**
   * Takes all children of the map and hydrates the children with the map properties.
   * @returns {array} - Array of cloned and hydrated children.
   */
  createChildren() {
    const { loaded } = this.state;
    const { children, google } = this.props;

    if (loaded) {
      // iterate over each children and add google and map properties onto it by cloning the child
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          google,
          map: this.map
        });
      });
    } else {
      return null;
    }
  }

  /**
   * Create Google Maps event listener.
   * @returns {void}
   */
  createEventListener() {
    this.map.addListener('idle', this.handleIdle);
  }

  /**
   * Remove Google Maps event listener.
   * @returns {void}
   */
  removeEventListener() {
    this.map.removeListener('idle', this.handleIdle);
  }

  /**
   * Handle the Google Maps "idle" event.
   * @returns {void}
   */
  handleIdle() {
    this.setState(() => ({
      children: this.createChildren()
    }));
  }
  
  render() {
    const { children } = this.state;
    return (
      <MapWrapper innerRef={c => this.root = c}>
        {
          children
        }
      </MapWrapper>
    );
  }
}

export default Map;

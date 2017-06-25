import React, { Component } from 'react';
import { mockPosition } from './mockPosition';

class Marker extends Component {
  constructor(props) {
    super(props);

    this.createMarker = this.createMarker.bind(this);
    this.checkMarkerPosition = this.checkMarkerPosition.bind(this);
    this.createEventListener = this.createEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  /**
   * React lifecycle method.
   * When the component mounts for the first time, mock a marker position
   * inside the current map bounds and create a marker.
   * @returns {void}
   */
  componentDidMount() {
    const { google, map } = this.props;
    this.createMarker();
  }

  /**
   * React lifecycle method.
   * When the component unmounts, remove all event listeners.
   * @returns {void}
   */
  componentWillUnmount() {
    this.removeEventListener();
  }

  /**
   * React lifecycle method.
   * When the component updates, call the checkMarkerPosition method
   * @param {object} prevProps - Previous props
   * @param {object} prevState - Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('Marker: → componentDidUpdate');
    this.checkMarkerPosition();
  }

  /**
   * Create a marker with at a mocked lat/lng position and place it onto the map.
   * @returns {void}
   */
  createMarker() {
    const { google, map, lat, lng } = this.props;

    let position = {};
    if (!lat && !lng) {
      position = mockPosition(google, map);
    } else {
      position = {
        lat,
        lng
      };
    }
    
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(position.lat, position.lng)
    });

    // set the marker onto the map
    this.marker.setMap(map);

    // create event listener
    this.createEventListener();
  }

  /**
   * Create event listeners for this marker.
   * @returns {void}
   */
  createEventListener() {
    this.marker.addListener('mouseover', this.handleMouseOver);
  }
  /**
   * Remove event listeners for this marker.
   * @returns {void}
   */
  removeEventListener() {
    this.marker.addListener('mouseover', this.handleMouseOver);
  }

  /**
   * Handles the hover event of this marker.
   * @returns {void}
   */
  handleMouseOver() {
    console.log('Marker hovered');
  }

  /**
   * Check if the current marker lies inside our current map bounds.
   * @returns {void}
   */
  checkMarkerPosition() {
    const { google, map } = this.props;
    // check if current marker is in the visible bounds
    const isInBounds = map.getBounds().contains(this.marker.getPosition());
    
    // if the marker is not inside the current marker position, move it!
    if (!isInBounds) {
      const mockedPosition = mockPosition(google, map);
      this.marker.setPosition(new google.maps.LatLng(mockedPosition.lat, mockedPosition.lng))
    }
  }

  render() {
    return null;
  }
}

export default Marker;

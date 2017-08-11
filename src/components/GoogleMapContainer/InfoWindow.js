import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import CustomInfoWindow from 'components/CustomInfoWindow';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/index';

/**
 * This component represents an overlay view.
 */
class InfoWindow extends Component {
  // PropTypes
  static propTypes = {
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  /**
   * On mount, initialize the factory OverlayView instance provided by google
   * and set the three default methods "onAdd", "draw" and "onRemove".
   */
  componentDidMount() {
    const { google, map } = this.props;

    this.infoWindow = new google.maps.OverlayView();
    this.infoWindow.onAdd = this.onAdd;
    this.infoWindow.draw = this.draw;
    this.infoWindow.onRemove = this.onRemove;
    this.infoWindow.setMap(map);
  }

  /**
   * When the component unmounts, set the map of the overlayview to null.
   * This calls the "onRemove" method of this class.
   */
  componentWillUnmount() {
    this.infoWindow.setMap(null);
  }

  /**
   * Google maps calls this method as soon as the overlayview can be drawn onto
   * the overlay map pane.
   *
   * This method gets called only once!
   */
  onAdd = () => {
    const { data } = this.props;
    // We create an empty DOM node...
    this.infoWindowItem = this.createWrapperElement();
    // ...and render a custom react component inside it.
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CustomInfoWindow w={150} h={125} data={data} />
      </ThemeProvider>,
      this.infoWindowItem
    );
    
    const panes = this.infoWindow.getPanes();
    panes.floatPane.appendChild(this.infoWindowItem);
  };

  /**
   * This method gets called each time the current maps viewport or zoom-level changes.
   * In here we convert the lat/lng values to pixel values and position the overlay.
   */
  draw = () => {
    const { google, data } = this.props;
    const latlng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng);
    const point = this.infoWindow.getProjection().fromLatLngToDivPixel(latlng);
    if (point) {
      this.infoWindowItem.style.left = point.x + 'px';
      this.infoWindowItem.style.top = point.y + 'px';
    }
  };

  /**
   * This method gets called as soon as we set the map property of
   * the overlayview to null. We remove all event listener and delete the
   * dom representation.
   */
  onRemove = () => {
    console.log('remove element');
    if (this.infoWindowItem) {
      this.infoWindowItem.parentNode.removeChild(this.infoWindowItem);
      this.infoWindowItem = null;
    }
  };

  /**
   * Create a virtual wrapper element.
   */
  createWrapperElement = () => {
    const el = document.createElement('div');
    el.style.cssText = 'position: relative;'
    return el;
  };

  render() {
    return null;
  }
}

export default InfoWindow;

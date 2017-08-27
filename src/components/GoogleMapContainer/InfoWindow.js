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
   * On every component update event, re-render the react component.
   * @param {object} prevProps - The previous props.
   * @param {object} prevState - The previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.infoWindowItem) {
      this.destroyReactComponent(this.infoWindowItem);
      this.renderReactComponent(this.infoWindowItem);
      this.draw();
    }
  }

  /**
   * Google maps calls this method as soon as the overlayview can be drawn onto
   * the overlay map pane.
   *
   * This method gets called only once!
   */
  onAdd = () => {
    // We create an empty DOM node and render a react root into this empty dom node.
    this.infoWindowItem = this.createWrapperElement();
    this.renderReactComponent(this.infoWindowItem);
    // Then we append the infoWindowItem to the floatPane
    // see https://developers.google.com/maps/documentation/javascript/reference?hl=de#MapPanes
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
    if (this.infoWindowItem) {
      this.destroyReactComponent(this.infoWindowItem);
      this.infoWindowItem.parentNode.removeChild(this.infoWindowItem);
      this.infoWindowItem = null;
    }
  };

  /**
   * Renders a given react component into a specified container.
   * @param {node} container - The dom node to render the react root into.
   */
  renderReactComponent = (container) => {
    const { data } = this.props;

    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CustomInfoWindow w={150} h={125} data={data} />
      </ThemeProvider>,
      container
    );
  }

  /**
   * Unmounts a react root component from the specified dom node.
   * @param {node} container - The container from which the component should be removed.
   */
  destroyReactComponent = (container) => {
    ReactDOM.unmountComponentAtNode(container);
  }

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

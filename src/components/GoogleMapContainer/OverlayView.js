import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CustomMarker from 'components/CustomMarker';

import { ThemeProvider } from 'styled-components';
import theme from 'theme/index';

/**
 * This component represents an overlay view.
 */
class OverlayView extends Component {
  // PropTypes
  static propTypes = {
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    data: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      id: PropTypes.any
    }).isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        fn: PropTypes.func
      })
    )
  };

  /**
   * On mount, initialize the factory OverlayView instance provided by google
   * and set the three default methods "onAdd", "draw" and "onRemove".
   */
  componentDidMount() {
    const { google, map } = this.props;

    console.log('overlayView componentDidMount');

    this.overlayView = new google.maps.OverlayView();
    this.overlayView.onAdd = this.onAdd;
    this.overlayView.draw = this.draw;
    this.overlayView.onRemove = this.onRemove;
    this.overlayView.setMap(map);
  }

  componentDidUpdate(prevState, prevProps) {
    console.log('overlay updated');
  }

  /**
   * When the component unmounts, set the map of the overlayview to null.
   * This calls the "onRemove" method of this class.
   */
  componentWillUnmount() {
    this.overlayView.setMap(null);
  }

  /**
   * Google maps calls this method as soon as the overlayview can be drawn onto
   * the overlay map pane.
   * 
   * We create an empty wrapper element with a fixed width/height and render a custom
   * marker component inside this wrapper element.
   * This is a trick because the overlayview of a google map only accepts static markup an
   * initialisation. Our wrapper element is this static markup. When the markup is
   * added to the DOM, we inject our custom marker inside this wrapper.
   *
   * This method gets called only once!
   */
  onAdd = () => {
    const { data, map } = this.props;
    // We create an empty DOM node...
    this.overlayItem = this.createWrapperElement(20, 20);
    // ...and render a custom react component inside it.
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CustomMarker
          data={data}
          map={map}
          delay={Math.floor(Math.random() * 10) + 1}
        />
      </ThemeProvider>,
      this.overlayItem
    );

    const panes = this.overlayView.getPanes();
    panes.floatPane.appendChild(this.overlayItem);

  };

  /**
   * This method gets called each time the current maps viewport or zoom-level changes.
   * In here we convert the lat/lng values to pixel values and position the overlay.
   */
  draw = () => {
    const { google, data } = this.props;
    const latlng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng);
    const point = this.overlayView.getProjection().fromLatLngToDivPixel(latlng);
    if (point) {
      this.overlayItem.style.left = point.x + 'px';
      this.overlayItem.style.top = point.y + 'px';
    }
  };

  /**
   * This method gets called as soon as we set the map property of
   * the overlayview to null. We remove all event listener and delete the
   * dom representation.
   */
  onRemove = () => {
    if (this.overlayItem) {
      this.overlayItem.parentNode.removeChild(this.overlayItem);
      this.overlayItem = null;
    }
  };

  /**
   * Helper method to create a dom node from a string representation.
   * @param {string} string - The html as string representation
   * @returns a valid dom node.
   */
  createElementFromString = string => {
    const template = document.createElement('div');
    template.innerHTML = string;
    return template.firstChild;
  };

  /**
   * Create a virtual wrapper element.
   * @param {number} width - The elements width.
   * @param {number} height - The elements height.
   */
  createWrapperElement = (width, height) => {
    const { data, handleOverlayClick } = this.props;
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      width:${width}px;
      height:${height}px;`;

    // add a click event to the overlay element.
    // we render a mini-react-app inside this wrapper and every
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleOverlayClick(data.id)
    });
    return el;
  };

  render() {
    return null;
  }
}

export default OverlayView;

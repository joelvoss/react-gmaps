import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import createElementFromString from 'utilities/createElementFromString';
import CustomMarker from 'components/CustomMarker';

/**
 * This component represents an overlay view.
 */
class RichMarker extends Component {
  // PropTypes
  static propTypes = {
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleOverlayClick: PropTypes.func
  };

  /**
   * On mount, initialize the factory OverlayView instance provided by google
   * and set the three default methods "onAdd", "draw" and "onRemove".
   */
  componentDidMount() {
    const { google, map } = this.props;

    this.richMarker = new google.maps.OverlayView();
    this.richMarker.onAdd = this.onAdd;
    this.richMarker.draw = this.draw;
    this.richMarker.onRemove = this.onRemove;
    this.richMarker.setMap(map);
  }

  /**
   * When the component unmounts, set the map of the overlayview to null.
   * This calls the "onRemove" method of this class.
   */
  componentWillUnmount() {
    this.richMarker.setMap(null);
  }

  /**
   * Google maps calls this method as soon as the overlayview can be drawn onto
   * the overlay map pane.
   *
   * This method gets called only once!
   */
  onAdd = () => {
    const { data, handleOverlayClick } = this.props;
   
    const html = ReactDOMServer.renderToStaticMarkup(
      <CustomMarker delay={Math.floor(Math.random() * 10) + 1} />
    );

    this.markerItem = createElementFromString(html);

    // add a click event to the overlay element.
    // we render a mini-react-app inside this wrapper and every
    this.markerItem.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleOverlayClick(data.id)
    });
    
    const panes = this.richMarker.getPanes();
    panes.overlayMouseTarget.appendChild(this.markerItem);
  };

  /**
   * This method gets called each time the current maps viewport or zoom-level changes.
   * In here we convert the lat/lng values to pixel values and position the overlay.
   */
  draw = () => {
    const { google, data } = this.props;
    const latlng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng);
    const point = this.richMarker.getProjection().fromLatLngToDivPixel(latlng);
    if (point) {
      this.markerItem.style.left = point.x + 'px';
      this.markerItem.style.top = point.y + 'px';
    }
  };

  /**
   * This method gets called as soon as we set the map property of
   * the overlayview to null. We remove all event listener and delete the
   * dom representation.
   */
  onRemove = () => {
    if (this.markerItem) {
      this.markerItem.parentNode.removeChild(this.markerItem);
      this.markerItem = null;
    }
  };

  render() {
    return null;
  }
}

export default RichMarker;

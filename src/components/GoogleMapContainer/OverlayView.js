import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CustomMarker from 'components/CustomMarker';

/**
 * This component represents an overlay view.
 */
class OverlayView extends Component {
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

    this.overlayView = new google.maps.OverlayView();
    this.overlayView.onAdd = this.onAdd;
    this.overlayView.draw = this.draw;
    this.overlayView.onRemove = this.onRemove;
    this.overlayView.setMap(map);
  }

  /**
   * When the component unmounts, set the map of the overlayview to null.
   * This calls the "onRemove" method of this overlayview.
   */
  componentWillUnmount() {
    this.overlayView.setMap(null);
  }

  /**
   * Google maps calls this method as soon as the overlayview can be drawn onto
   * the overlay map pane. We do some react trickery here to import a stand-alone
   * react component and append it to the appropriate google maps pane.
   *
   * This method gets called only once!
   */
  onAdd = () => {
    const { data } = this.props;

    if (!this.overlayItem) {
      // We create an empty DOM node
      this.overlayItem = this.createWrapperElement(20, 20);
      ReactDOM.render(
        <CustomMarker markerId={data.id} delay={Math.floor(Math.random() * 10) + 1} />,
        this.overlayItem
      );

      const panes = this.overlayView.getPanes();
      panes.overlayImage.appendChild(this.overlayItem);
    }
  };

  /**
   * This method gets called each time the current maps viewport or zoom-level changes.
   * In here we convert the lat/lng values to pixel values and position the overlay.
   */
  draw = () => {
    const { google, data } = this.props;

    const latlng = new google.maps.LatLng(data.lat, data.lng);
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
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;cursor:pointer;width:${width}px;height:${height}px;pointer-events:none;`;
    return el;
  }

  /**
   * Helper method that normalizes a given svg string.
   * @param {string} svgString - The raw svg string.
   * @param {number} width - The with of the final svg.
   * @param {number} height - The height of the final svg.
   */
  createSVGDataURIFromString = (svgString, width, height) => {
    return (
      'data:image/svg+xml,' +
      encodeURIComponent(
        svgString
          .replace(/width\s*=\s*"?(\d+)"/, `width="${width}"`)
          .replace(/height\s*=\s*"?(\d+)"/, `height="${height}"`)
          .replace(/\n+/g, '')
      ) // remove newlines & encode URL-unsafe characters
        .replace(/%20/g, ' ') // put spaces back in
        .replace(/%3D/g, '=') // ditto equals signs
        .replace(/%3A/g, ':') // ditto colons
        .replace(/%2F/g, '/') // ditto slashes
        .replace(/%22/g, "'") // replace quotes with apostrophes (may break certain SVGs)
    );
  };

  render() {
    return null;
  }
}

export default OverlayView;

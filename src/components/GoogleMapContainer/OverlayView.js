import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CustomMarker from 'components/CustomMarker';

import * as markerActions from 'actions/markerActions';

/**
 * This component represents an overlay view.
 */
class OverlayView extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.draw = this.draw.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.removeAllEventListener = this.removeAllEventListener.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * On mount, initialize the factory OverlayView instance provided by google
   * and set the three default methods "onAdd", "draw" and "onRemove".
   */
  componentDidMount() {
    const { google, map } = this.props;

    if (google && map) {
      this.overlayView = new google.maps.OverlayView();
      this.overlayView.onAdd = this.onAdd;
      this.overlayView.draw = this.draw;
      this.overlayView.onRemove = this.onRemove;
      this.overlayView.setMap(map);
    }
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
   * Furthermore we create all event listener for this overlay.
   *
   * This method gets called only once!
   */
  onAdd() {
    const { markerId, i } = this.props;

    if (!this.overlayItem) {
      const html = renderToString(
        <CustomMarker markerId={markerId} delay={i} />
      );
      this.overlayItem = this.createElementFromString(html);

      this.createEventListener()

      const panes = this.overlayView.getPanes();
      panes.overlayImage.appendChild(this.overlayItem);
    }
  }

  /**
   * This method gets called each time the current maps viewport or zoom-level changes.
   * In here we convert the lat/lng values to pixel values and position the overlay.
   */
  draw() {
    const { google, lat, lng } = this.props;

    const latlng = new google.maps.LatLng(lat, lng);
    const point = this.overlayView.getProjection().fromLatLngToDivPixel(latlng);

    if (point) {
      this.overlayItem.style.left = point.x + 'px';
      this.overlayItem.style.top = point.y + 'px';
    }
  }

  /**
   * This method gets called as soon as we set the map property of
   * the overlayview to null. We remove all event listener and delete the
   * dom representation.
   */
  onRemove() {
    console.log('onRemove');
    if (this.overlayItem) {
      this.removeAllEventListener();
      this.overlayItem.parentNode.removeChild(this.overlayItem);
      this.overlayItem = null;
    }
  }

  /**
   * Helper method to create a dom node from a string representation.
   * @param {string} string - The html as string representation
   * @returns a valid dom node.
   */
  createElementFromString(string) {
    const template = document.createElement('div');
    template.innerHTML = string;
    return template.firstChild;
  }

  /**
   * Create event listeners for this overlayview.
   */
  createEventListener() {
    this.overlayItem.addEventListener('click', this.handleClick);
    this.overlayItem.addEventListener('mouseover', this.handleMouseOver);
    this.overlayItem.addEventListener('mouseout', this.handleMouseOut);
  }

  /**
   * Remove all event listeners of this overlayview.
   */
  removeAllEventListener() {
    this.overlayItem.removeEventListener('click', this.handleClick);
    this.overlayItem.removeEventListener('mouseover', this.handleMouseOver);
    this.overlayItem.removeEventListener('mouseout', this.handleMouseOut);
  }

  /**
   * Handles the mouseover event of this overlayview.
   */
  handleMouseOver() {
    const { actions, markerId } = this.props;

    actions.hoverMarker(markerId);
    this.smoothScrollToElement(markerId);
  }

  /**
   * Handles the mouseleave event of this overlayview.
   */
  handleMouseOut() {
    const { actions, markerId } = this.props;
    actions.unhoverMarker(markerId);
  }

  /**
   * Handles the cick event of this overlayview.
   */
  handleClick() {
    const { /*actions,*/ markerId } = this.props;
    console.log(`marker with id ${markerId} clicked!`);
    //actions.selectMarker(markerId);
  }

  /**
   * Smooth scroll to the element with a given id
   * by querying the DOM for the element with a data-attr attached to it.
   * Uses the smoothscroll polyfill, see https://github.com/iamdustan/smoothscroll
   * @param {string} id - The id of the element to scroll to.
   */
  smoothScrollToElement(id) {
    const listEl = document.querySelector(`[data-markerItemId="${id}"]`);
    listEl.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return null;
  }
}

// Maps redux state to props.
const mapStateToProps = state => {
  return {
    google: state.google.lib,
    map: state.google.map,
    mapConfig: state.google.config
  };
};

// Maps dispatch method to props.
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayView);

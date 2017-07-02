import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as markerActions from './../../actions/markerActions';

class Marker extends Component {
  constructor(props) {
    super(props);

    this.renderMarker = this.renderMarker.bind(this);
    this.createEventListener = this.createEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * React lifecycle method.
   * When the component mounts for the first time, mock a marker position
   * inside the current map bounds and create a marker.
   * @returns {void}
   */
  componentDidMount() {
    this.renderMarker();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.lat !== this.props.lat)
        || (nextProps.lng !== this.props.lng)) {      
      this.renderMarker();
    }
  }

  /**
   * React lifecycle method.
   * When the component unmounts, remove all event listeners.
   * @returns {void}
   */
  componentWillUnmount() {
    this.marker.setMap(null);
    this.removeEventListener();
  }

  /**
   * Creates or updates a marker with the given props
   * @returns {void}
   */
  renderMarker() {
    const { google, map, lat, lng } = this.props;

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map
      });

      // create event listener for this marker
      this.createEventListener();
    } else {
      this.marker.setPosition({ lat, lng })
    }
  }

  /**
   * Create event listeners for this marker.
   * @returns {void}
   */
  createEventListener() {
    this.marker.addListener('mouseover', this.handleMouseOver);
    this.marker.addListener('mouseout', this.handleMouseOut);
    this.marker.addListener('click', this.handleClick);
  }
  /**
   * Remove event listeners for this marker.
   * @returns {void}
   */
  removeEventListener() {
    this.marker.removeListener('mouseover', this.handleMouseOver);
    this.marker.removeListener('mouseout', this.handleMouseOut);
    this.marker.removeListener('click', this.handleClick);
  }

  /**
   * Handles the mouseover event of a google maps marker.
   * @returns {void}
   */
  handleMouseOver() {
    const { actions, id } = this.props;
    actions.hoverMarker(id);
    this.smoothScrollToElement(id);
  }

  /**
   * Handles the mouseleave event of a google maps marker.
   * @returns {void}
   */
  handleMouseOut() {
    const { actions, id } = this.props;
    actions.unhoverMarker(id);
  }

  /**
   * Handles a cick event on a google maps marker.
   * @returns {void}
   */
  handleClick() {
    const { actions, id } = this.props;
    console.log('select marker');
    actions.selectMarker(id);
  }

  /**
   * Smooth scroll to the element with a given id
   * by querying the DOM for the element with a data-attr attached to it.
   * Uses the smoothscroll polyfill, see https://github.com/iamdustan/smoothscroll
   * @param {string} id - The uuidv4 ID of the element to scroll to.
   * @returns {void}
   */
  smoothScrollToElement(id) {
    const listEl = document.querySelector(`[data-markerItemId="${id}"]`);
    listEl.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Marker);

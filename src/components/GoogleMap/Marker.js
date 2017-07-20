import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as markerActions from 'actions/markerActions';

/**
 * This component represents a single marker inside the google map.
 */
class Marker extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  };

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
   * When the component mounts, render a marker on the google map.
   */
  componentDidMount() {
    this.renderMarker();
  }

  /**
   * If the props of a marker change, re-render the marker.
   * @param {object} nextProps - The next properties.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) {
      this.renderMarker();
    }
  }

  /**
   * When the component unmounts, remove all event listeners
   * and null the current connected map-data for this marker.
   */
  componentWillUnmount() {
    this.removeEventListener();
    this.marker.setMap(null);
  }

  /**
   * Renders a marker with the given props and creates all event listeners for it.
   * If the marker was already initialized, update its position.
   */
  renderMarker() {
    const { google, map, lat, lng } = this.props;
    if (!this.marker) {
      const position = { lat: lat, lng: lng };
      this.marker = new google.maps.Marker({
        position,
        map
      });
      // create event listener for this marker
      this.createEventListener();
    } else {
      this.marker.setPosition({ lat, lng });
    }
  }

  /**
   * Create event listeners for this marker.
   */
  createEventListener() {
    this.marker.addListener('mouseover', this.handleMouseOver);
    this.marker.addListener('mouseout', this.handleMouseOut);
    this.marker.addListener('click', this.handleClick);
  }
  /**
   * Remove all event listeners of this marker.
   */
  removeEventListener() {
    return new Promise((resolve, reject) => {
      const { google } = this.props;
      google.maps.event.clearInstanceListeners(this.marker);
      return resolve();
    });
  }

  /**
   * Handles the mouseover event of this marker.
   */
  handleMouseOver() {
    const { actions, id } = this.props;
    actions.hoverMarker(id);
    this.smoothScrollToElement(id);
  }

  /**
   * Handles the mouseleave event of this marker.
   */
  handleMouseOut() {
    const { actions, id } = this.props;
    actions.unhoverMarker(id);
  }

  /**
   * Handles the cick event of this marker..
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
   * @param {string} id - The id of the element to scroll to.
   */
  smoothScrollToElement(id) {
    // const listEl = document.querySelector(`[data-markerItemId="${id}"]`);
    // listEl.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return null;
  }
}

// Maps redux state to props.
const mapStateToProps = state => {
  return {
    google: state.google.lib,
    map: state.google.map
  };
};

// Maps dispatch method to props.
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);

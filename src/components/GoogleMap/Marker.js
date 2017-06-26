import { Component } from 'react';

class Marker extends Component {
  constructor(props) {
    super(props);

    this.renderMarker = this.renderMarker.bind(this);
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
  }
  /**
   * Remove event listeners for this marker.
   * @returns {void}
   */
  removeEventListener() {
    this.marker.removeListener('mouseover', this.handleMouseOver);
  }

  /**
   * Handles the hover event of this marker.
   * @returns {void}
   */
  handleMouseOver() {
    const { id } = this.props;
    console.log(`Marker ${id} hovered`);
  }

  render() {
    return null;
  }
}

export default Marker;

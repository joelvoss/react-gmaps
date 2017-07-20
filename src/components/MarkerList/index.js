import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from './List';

import * as markerActions from 'actions/markerActions';

/**
 * This component represents a list of items.
 */
class MarkerList extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
   * Handle a mouseover event.
   * @param {string} id - The id of the element that was interacted with.
   */
  handleMouseOver(id) {
    const { actions } = this.props;
    actions.hoverMarker(id);
  }

  /**
   * Handle a mouseleave event.
   * @param {any} id - The id of the element that was interacted with.
   */
  handleMouseLeave(id) {
    const { actions } = this.props;
    actions.unhoverMarker(id);
  }

  render() {
    const { marker } = this.props;
    return <List marker={marker} handleMouseLeave={this.handleMouseLeave} handleMouseOver={this.handleMouseOver} />;
  }
}

// Map redux state to props.
const mapStateToProps = state => {
  return {
    marker: state.marker.list
  };
};

// Map dispatch method to action creators.
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);

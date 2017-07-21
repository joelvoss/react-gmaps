import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import ListItem from './ListItem';

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
    return (
      <TransitionGroup component={Wrapper}>
        {marker &&
          marker.map(m =>
            <ListItem
              key={m.place_id}
              marker={m}
              handleMouseOver={this.handleMouseOver}
              handleMouseLeave={this.handleMouseLeave}
            />
          )}
      </TransitionGroup>
    );
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

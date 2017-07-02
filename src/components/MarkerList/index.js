import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from './List';

import * as markerActions from './../../actions/markerActions';

class MarkerList extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver(id) {
    const { actions } = this.props;
    actions.hoverMarker(id);
  }
  handleMouseLeave(id) {
    const { actions } = this.props;
    actions.unhoverMarker(id);
  }
  
  render() {
    const { marker } = this.props;
    return (
      <List
        marker={marker}
        handleMouseLeave={this.handleMouseLeave}
        handleMouseOver={this.handleMouseOver}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    marker: state.marker.list
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(markerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);

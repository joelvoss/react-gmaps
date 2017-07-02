import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import Item from './Item';

import * as markerActions from './../../actions/markerActions';

class List extends Component {
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
      <Wrapper>
        {
          marker && marker.map((m, i) => {
            return (
              <Item 
                key={m.id} i={i}
                markerId={m.id}
                hovered={m.hovered}
                onMouseOver={() => this.handleMouseOver(m.id)}
                onMouseLeave={() => this.handleMouseLeave(m.id)}
              >
                Marker <span>{m.id}</span>
              </Item>
            )
          })
        }
      </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);

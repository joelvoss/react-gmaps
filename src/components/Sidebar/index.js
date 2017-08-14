import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

import Autocomplete from 'components/Autocomplete';

/**
 * This component represents a list of items.
 */
class Sidebar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    globalState: PropTypes.object
  };

  render() {
    const { config, globalState } = this.props;
    const location = {
      lat: globalState.position.lat,
      lng: globalState.position.lng
    };
    const radius = globalState.position.radius;

    return (
      <Wrapper>
        {/* Content */}
        <Autocomplete config={config} location={location} radius={radius} />
      </Wrapper>
    );
  }
}

export default Sidebar;

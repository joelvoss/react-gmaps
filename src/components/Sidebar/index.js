import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

import Autocomplete from 'components/Autocomplete';

/**
 * This component represents a list of items.
 */
class Sidebar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render() {
    const { config } = this.props;
    return (
      <Wrapper>
        {/* Content */}
        <Autocomplete config={config}/>
      </Wrapper>
    );
  }
}

export default Sidebar;

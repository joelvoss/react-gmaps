import React, { Component } from 'react';
import Wrapper from './Wrapper';

import Autocomplete from 'components/Autocomplete';

/**
 * This component represents a list of items.
 */
class Sidebar extends Component {
  render() {
    return (
      <Wrapper>
        {/* Content */}
        <Autocomplete />
      </Wrapper>
    );
  }
}

export default Sidebar;

import React, { Component } from 'react';
import styled from 'styled-components';

import SuggestItem from './SuggestItem';

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class SuggestList extends Component {

  render() {
    const { suggests, isHidden } = this.props;
    const hidden = (!suggests.length || isHidden);

    return (
      <ul>
        
      </ul>
    );
  }
}

export default SuggestList;
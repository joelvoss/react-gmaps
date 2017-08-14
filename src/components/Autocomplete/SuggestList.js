import React, { Component } from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import SuggestItem from './SuggestItem';

const Wrapper = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  margin: 0;
  padding: 0;
  list-style: none;

  & li:last-child {
    border-bottom: 1px solid ${props => props.theme.secondary};
    border-radius: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class SuggestList extends Component {
  render() {
    const { suggests, isHidden } = this.props;
    const hidden = !suggests.length || isHidden;

    return (
      <TransitionGroup component={Wrapper}>
        {suggests &&
          suggests.map((suggest, i) => {
            return <SuggestItem key={i} suggest={suggest} />;
          })}
      </TransitionGroup>
    );
  }
}

export default SuggestList;

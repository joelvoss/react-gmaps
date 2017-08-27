import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchIcon from './Search.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  padding: 0.7em 1em;
  background: ${props => props.theme.colors.default.secondary};
  border: 1px solid ${props => props.theme.colors.default.secondary};

  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  transition: all .2s ease-out;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.lighten.secondary};
    border: 1px solid ${props => props.theme.colors.lighten.secondary};
  }
`;

const Icon = styled.span`
  display: inline-block;
  line-height: 0;
  svg {
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.colors.default.lightGrey};
  }
`;

class Button extends PureComponent {
  static propTypes = {
    showSuggests: PropTypes.func.isRequired,
    handleIgnoreBlur: PropTypes.func.isRequired
  };

  render() {
    const { showSuggests, handleIgnoreBlur } = this.props;

    return (
      <Wrapper
        onClick={showSuggests}
        onMouseDown={() => handleIgnoreBlur(true)}
      >
        <Icon dangerouslySetInnerHTML={{ __html: SearchIcon }} />
      </Wrapper>
    );
  }
}

export default Button;

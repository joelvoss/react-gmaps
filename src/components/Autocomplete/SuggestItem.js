import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const Wrapper = styled.li`
  display: block;
  width: 100%;
  font-size: 1rem;
  margin: 0;
  padding: 0.3em;
  background: ${props => props.theme.colors.default.white};
  border-left: 1px solid ${props => props.theme.colors.default.secondary};
  border-right: 1px solid ${props => props.theme.colors.default.secondary};
  border-bottom: 1px solid transparent;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.default.lightPink};
  }

  &:last-child {
    border-bottom: 2px solid ${props => props.theme.colors.default.secondary};
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const MainText = styled.span`
  padding: 0 0.2em;
  color: ${props => props.theme.colors.default.primary};
`;

const SecondaryText = styled.span`
  font-size: 0.9rem;
  padding: 0 0.2em;
  color: ${props => props.theme.colors.default.secondary};
`;

class SuggestItem extends PureComponent {
  static propTypes = {
    suggest: PropTypes.object.isRequired,
    handleIgnoreBlur: PropTypes.func.isRequired
  };

  render() {
    const { suggest, handleIgnoreBlur } = this.props;
    const duration = 250; // in ms

    return (
      <Transition in={this.props.in} timeout={duration} mountOnEnter={true} unmountOnExit={true}>
        {status => {
          const style = {
            opacity: 0,
            transition: `all ${duration}ms ease-out`
          };
          switch (status) {
            case 'entering':
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
            case 'entered':
              style.transform = 'translateY(0)';
              style.opacity = 1;
              break;
            case 'exiting':
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
            default:
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
          }
          return (
            <Wrapper
              style={{ ...style }}
              onMouseDown={() => handleIgnoreBlur(true)}
            >
              <MainText>{suggest.mainText}</MainText>
              <SecondaryText>{suggest.secondaryText}</SecondaryText>
            </Wrapper>
          );
        }}
      </Transition>
    );
  }
}

export default SuggestItem;

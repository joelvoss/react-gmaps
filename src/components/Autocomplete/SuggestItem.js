import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const Wrapper = styled.li`
  padding: 0.3em 0.5em;
  font-size: 1rem;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  border-left: 1px solid ${props => props.theme.secondary};
  border-right: 1px solid ${props => props.theme.secondary};

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.lightPink};
  }
`;

class SuggestItem extends PureComponent {
  static propTypes = {
    suggest: PropTypes.object.isRequired
  };

  render() {
    const { suggest } = this.props;
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
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
            case 'entered':
              style.transform = 'translateY(0)';
              style.opacity = 1;
              break;
            case 'exiting':
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
            default:
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
          }
          return (
            <Wrapper style={{ ...style }}>
              {suggest.description}
            </Wrapper>
          );
        }}
      </Transition>
    );
  }
}

export default SuggestItem;

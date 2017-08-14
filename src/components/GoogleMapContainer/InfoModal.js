import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
  text-align: center;
`;

const Inner = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
  padding: 0.5em 1.5em;
  font-size: 0.8rem;

  border-radius: 30px;
  background: ${props => props.theme.lightGrey};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  pointer-events: all;
`;

/**
 * Modal component displaying the current geolocation status.
 */
const InfoModal = props => {
  const { show, children } = props;
  const duration = 400; // in ms

  return (
    <Transition in={show ? true : false} timeout={duration} mountOnEnter={true} unmountOnExit={true}>
      {status => {
        const style = {
          opacity: 0,
          transition: `all ${duration}ms ease-in-out`
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
            <Inner>
              {children}
            </Inner>
          </Wrapper>
        );
      }}
    </Transition>
  );
};

export default InfoModal;

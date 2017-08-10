import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Marker = styled.div.attrs({
  'data-marker-id': props => props.markerId
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease-in forwards;
  animation-delay: ${props => `${props.delay}s`};
  pointer-events:all;

  transition: transform 0.07s ease-in;
  backface-visibility: hidden;
  
  &:hover {
    transform: scale(1.2);
    z-index: 9999;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  background: #ed2461;
  border: 3px solid #fbd4e1;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

const Pulse = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: #ed2461;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform-origin: center;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${props => `${props.delay}s`};
  pointer-events: none;
`;

const CustomMarker = props => {
  const { markerId, delay } = props;

  const event = () => {
    console.log(markerId);
  };

  return (
    <Marker onClick={event}>
      <Pulse delay={delay * 0.5}/>
      <Inner />
    </Marker>
  );
}

export default CustomMarker;

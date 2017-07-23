import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 0.75
  }
  50% {
    opacity: 1
  }
  100% {
    opacity: 0.75
  }
`;

const Marker = styled.div.attrs({
  'data-marker-id': props => props.markerId
})`
  position: absolute;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.75);
  border: 2px solid #fbd4e1;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 14px;
  height: 14px;
  background: #ed2461;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s ease-in-out infinite;
  pointer-events: none;
`;

const CustomMarker = props => {
  const { markerId } = props;
  return (
    <Marker markerId={markerId}>
      <Inner />
    </Marker>
  );
}

export default CustomMarker;

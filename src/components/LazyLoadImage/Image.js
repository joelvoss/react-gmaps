import styled, { keyframes } from 'styled-components';

const blurIn = keyframes`
  0% {
    filter: blur(20px);
  }
  100% {
    filter: blur(0);
  }
`;

export const Img = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: url(${props => props.source});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fff;

  animation: ${blurIn} 1s linear;
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1);
`;

export const BluredImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: url(${props => props.source});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fff;

  filter: blur(20px);
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1);
`;

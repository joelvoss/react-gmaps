import styled from 'styled-components';

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

  filter: blur(10px);
  opacity: ${props => props.loaded ? '0' : '1' };
  transition: opacity ${props => props.animation ? '1s' : '0' };

  /* this is needed so Safari keeps sharp edges */
  transform: scale(1.5);
`;

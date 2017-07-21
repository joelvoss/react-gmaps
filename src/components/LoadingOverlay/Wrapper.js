import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 99;

  opacity: ${props => props.animation.opacity};
  transition: ${props => `all ${props.animation.duration}ms ease-in-out`};
`;

export default Wrapper;

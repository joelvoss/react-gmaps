import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f6f6f6;
  width: 100%;
  height: ${props => `${props.intrinsicHeight}px`};
`;

export default Wrapper;

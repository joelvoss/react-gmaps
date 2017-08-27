import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  min-height: ${props => props.minHeight}px;
`;

export default Wrapper;

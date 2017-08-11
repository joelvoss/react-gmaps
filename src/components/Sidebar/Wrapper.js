import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  flex: 0 0 40%;
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.lightGrey};

  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 1;

  overflow: auto;
`;

export default Wrapper;

import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  max-height: 600px;
  border: 1px solid ${props => props.theme.lightGrey};
  overflow: hidden;
`;

export default Box;

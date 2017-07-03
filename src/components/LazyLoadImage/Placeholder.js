import styled from 'styled-components';

export const IntrinsicPlaceholder = styled.div`
  padding-bottom: ${props => props.paddingBottom}%;
`;

const Placeholder = styled.div`
  background-color: #f6f6f6;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

export default Placeholder;

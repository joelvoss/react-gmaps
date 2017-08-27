import styled from 'styled-components';

const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: 0.7em 1em;
  background: ${props => props.theme.colors.default.white};
  color: ${props => props.theme.colors.default.primary};
  border: 1px solid ${props => props.theme.colors.default.white};
  outline: none;

  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  
  transition: border .1s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);

  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: rgba(255,255,255,0);

  &:focus {
    border: 1px solid ${props => props.theme.colors.default.secondary};
  }
`;

export default Input;

import styled from 'styled-components';

const Button = styled.div`
  font-size: 1rem;
  padding: 0.7em 1em;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.secondary};

  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  transition: border .1s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
`;

export default Button;

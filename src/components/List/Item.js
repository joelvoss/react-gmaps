import styled from 'styled-components';

const Item = styled.li`
  margin: 0;
  padding: 0.2em 1em;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  border-top: ${props => props.i === 0 ? '1px solid rgba(0,0,0,0.3)' : 'none'};
  cursor: pointer;
  transition: background-color .2s;
  background-color: ${props => props.hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)'};

  & span {
    display: block;
    font-size: 0.7em;
    pointer-events: none;
  }
`;

export default Item;

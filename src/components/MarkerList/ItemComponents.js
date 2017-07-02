import styled from 'styled-components';

export const Item = styled.li.attrs({
  'data-markerItemId': props => props.markerId
})`
  margin: 0;
  padding: 0.5em 1em;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  border-top: ${props => props.i === 0 ? '1px solid rgba(0,0,0,0.3)' : 'none'};
  cursor: pointer;
  transition: background-color .2s;
  background-color: ${props => props.hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)'};

  display: flex;
  flex-direction: row;
`;

export const Image = styled.div`
  width: 75px;
  height: 75px;
  flex-basis: 75px;

  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  margin: 0 0.75em 0.75em 0;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 0.9em;
  line-height: 0.9em;
  padding: 0;
  margin: 0 0 0.2em 0;
`;

export const Location = styled.span`
  font-size: 0.7em;
  font-weight: 700;
  padding: 0;
  margin: 0 0 0.5em 0;
`;

export const Description = styled.p`
  flex: 1;
  font-color: #666;
  font-size: 0.9em;
  padding: 0;
  margin: 0 0 0.5em 0;
`;

export const Meta = styled.span`
  font-size: 0.6em;
  padding: 0;
  margin: 0;
`;
import styled from 'styled-components';
import LazyLoadImage from 'components/LazyLoadImage';

export const Item = styled.li.attrs({
  'data-markerItemId': props => props.markerId
})`
  margin: 0;
  padding: 0.5em 1em;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
  transition: background-color .2s;
  background-color: ${props => (props.hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)')};

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ListImage = styled(LazyLoadImage)`
  width: 100px;
  margin-right: 1em;
  pointer-events: none;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  align-self: stretch;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1.2;
  padding: 0;
  margin: 0 0 0.5em 0;
  pointer-events: none;
  color: ${props => props.theme.primary};
`;

export const Location = styled.span`
  font-size: 0.7em;
  line-height: 1.2;
  font-weight: 700;
  padding: 0;
  margin: 0 0 0.5em 0;
  pointer-events: none;
`;

export const Open = styled.span`
  font-size: 0.7em;
  line-height: 1.2;
  padding: 0;
  margin: 0;
  pointer-events: none;
  color: MediumSeaGreen;
`;

export const Closed = Open.extend`
  color: tomato;
`;

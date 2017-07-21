import styled from 'styled-components';
import LazyLoadImage from 'components/LazyLoadImage';

export const Item = styled.li.attrs({
  'data-markerItemId': props => props.markerId
})`
  margin: 0.75rem;
  padding: 0.5em 1em;
  cursor: pointer;
  background-color: ${props => props.theme.white};
  border-radius: 6px;
  box-shadow: ${props => (props.hovered ? '0 3px 6px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)')} ;

  opacity: ${props => props.transitionStyles.opacity};
  transform: scale(${props => (props.hovered ? 1.05 : 1)});
  transition: transform 100ms ease-in-out, box-shadow 100ms ease-in-out, opacity ${props =>
    props.transitionStyles.duration}ms ease-in-out;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ListImage = styled(LazyLoadImage)`
  flex: 0 0 75px;
  height: 75px;
  margin-right: 1em;
  pointer-events: none;
  border-radius: 50%;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  padding: 0.25rem 0;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 0.8em;
  line-height: 1.1;
  padding: 0;
  margin: 0 0 0.5em 0;
  pointer-events: none;
  color: ${props => props.theme.primary};
`;

export const Location = styled.span`
  font-size: 0.7em;
  line-height: 1.1;
  padding: 0;
  margin: 0 0 0.5em 0;
  pointer-events: none;
  color: ${props => props.theme.secondary};
`;

export const Open = styled.span`
  font-size: 0.7em;
  line-height: 1.2;
  padding: 0;
  margin: 0;
  pointer-events: none;
  color: MediumSeaGreen;
`;

export const Closed = Open.extend`color: tomato;`;

import React from 'react';
import styled from 'styled-components';
import { Item, Image, InfoWrapper, Title, Location, Description, Meta } from './ItemComponents';

const Ul = styled.ul`
  position: relative;
  list-style: none;
  flex: 0 0 33%;
  margin: 0;
  padding: 0;

  overflow: auto;
`;

const List = (props) => {
  const { marker, handleMouseOver, handleMouseLeave } = props;
  return (
    <Ul>
      {
        marker && marker.map((m, i) => {
          return (
            <Item 
              key={m.id} i={i}
              markerId={m.id}
              hovered={m.hovered}
              onMouseOver={() => handleMouseOver(m.id)}
              onMouseLeave={() => handleMouseLeave(m.id)}
            >
            <Image src={`https://unsplash.it/57/7${5 + i}/?random`} alt={m.title} />
            <InfoWrapper>
              <Title>{m.title}</Title>
              <Location>{m.meta}</Location>
              <Description>{m.desc}</Description>
              <Meta>{m.id}</Meta>
            </InfoWrapper>
            </Item>
          )
        })
      }
    </Ul>
  );
}

export default List;

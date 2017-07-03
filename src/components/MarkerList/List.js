import React from 'react';
import styled from 'styled-components';
import Ul from './Ul';
import { Item, ListImage, InfoWrapper, Title, Location, Meta } from './ItemComponents';

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
              <ListImage
                intrinsicHeight={100}
                placeholder={`https://unsplash.it/25/25/?random`}
                src={`https://unsplash.it/200/200/?random`}
                alt={m.title}
              />
              <InfoWrapper>
                <Title>{m.title}</Title>
                <Location>{m.meta}</Location>
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

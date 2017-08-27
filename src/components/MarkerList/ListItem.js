import React from 'react';
import Transition from 'react-transition-group/Transition';
import { Item, ListImage, InfoWrapper, Title, Location, Open, Closed } from './ItemComponents';
import Spacer from './Spacer';

const ListItem = props => {
  const { in: inProp, marker, handleMouseOver, handleMouseLeave } = props;
  const duration = 400; // in ms
  return (
    <Transition in={inProp} timeout={duration}>
      {status => {
        // if the component exited, remove it from the dom
        if (status === 'exited') {
          return null;
          // on all other transition states, set the animation property
        } else {
          const styles = {
            opacity: 0,
            duration
          };
          switch (status) {
            case 'entering':
              styles.opacity = 0;
              break;
            case 'entered':
              styles.opacity = 1;
              break;
            case 'exiting':
              styles.opacity = 0;
              break;
            default:
              styles.opacity = 0;
              break;
          }
          return (
            <Item
              transitionStyles={styles}
              markerId={marker.place_id}
              hovered={marker.hovered}
              onMouseOver={() => handleMouseOver(marker.place_id)}
              onMouseLeave={() => handleMouseLeave(marker.place_id)}
            >
              <ListImage
                placeholder={marker.image.thumbnail}
                src={marker.image.medium || marker.image.thumbnail}
              />
              <InfoWrapper>
                <Title>
                  {marker.name}
                </Title>
                <Location>
                  {marker.vicinity}
                </Location>
                <Spacer />
                {marker.opening_hours && marker.opening_hours.open_now
                  ? <Open>Jetzt geöffnet</Open>
                  : <Closed>Geschlossen</Closed>}
              </InfoWrapper>
            </Item>
          );
        }
      }}
    </Transition>
  );
};

export default ListItem;

import React from 'react';
import Wrapper from './Wrapper';
import Background from './Background';
import Loader from './Loader';

import Transition from 'react-transition-group/Transition';

const LoadingOverlay = props => {
  const { show } = props;
  const duration = 400; // in ms
  return (
    <Transition in={show} timeout={duration}>
      {status => {
        console.log(status);
        // if the component exited, remove it from the dom
        if (status === 'exited') {
          return null;
          // on all other transition states, set the animation property
        } else {
          const aniProp = {
            opacity: 0,
            duration
          };
          switch (status) {
            case 'entering':
              aniProp.opacity = 0;
              break;
            case 'entered':
              aniProp.opacity = 1;
              break;
            case 'exiting':
              aniProp.opacity = 0;
              break;
            default:
              aniProp.opacity = 0;
              break;
          }

          console.log(aniProp);
          return (
            <Wrapper animation={aniProp}>
              <Background />
              <Loader />
            </Wrapper>
          );
        }
      }}
    </Transition>
  );
};

export default LoadingOverlay;

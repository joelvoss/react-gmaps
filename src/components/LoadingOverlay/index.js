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
          const style = {
            opacity: 0,
            transition: `all ${duration}ms ease-in-out`
          };
          switch (status) {
            case 'entering':
              style.opacity = 0;
              break;
            case 'entered':
              style.opacity = 1;
              break;
            case 'exiting':
              style.opacity = 0;
              break;
            default:
              style.opacity = 0;
              break;
          }
          return (
            <Wrapper style={{...style}}>
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

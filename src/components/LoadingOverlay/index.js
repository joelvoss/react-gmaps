import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Wrapper from './Wrapper';
import Background from './Background';
import Loader from './Loader';

const LoadingOverlay = props => {
  return (
    <TransitionGroup>
      <Wrapper>
        <Background />
        <Loader />
      </Wrapper>
    </TransitionGroup>
  );
};

export default LoadingOverlay;

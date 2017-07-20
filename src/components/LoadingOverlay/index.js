import React from 'react';
import Wrapper from './Wrapper';
import Background from './Background';
import Loader from './Loader';

const LoadingOverlay = props => {
  const { show } = props;
  return (
    <Wrapper show={show}>
      <Background />
      <Loader />
    </Wrapper>
  );
};

export default LoadingOverlay;

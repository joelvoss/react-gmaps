import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import Loader from 'components/LoadingOverlay/Loader';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
  text-align: center;
`;

const Inner = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
  padding: 0.5em 1.5em;
  font-size: 0.8rem;

  border-radius: 30px;
  background: ${props => props.theme.lightGrey};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  pointer-events: all;
`;

/**
 * Simple loading component.
 * @param {object} props - Component properties.
 */
const LoadingComponent = props => {
  const LoadingWrap = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  const SmallLoader = styled(Loader)`
    width: 20px;
    height: 20px;
  `;

  const LoadingText = styled.p`
    margin: 0 1em;
    padding: 0;
    color: ${props => props.theme.primary};
    font-weight: 700;
  `;

  return (
    <LoadingWrap>
      <SmallLoader />
      <LoadingText>Suche Standort</LoadingText>
    </LoadingWrap>
  );
};

/**
 * Simple error component.
 * @param {object} props - Component properties.
 */
const ErrorComponent = props => {
  const ErrorWrap = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  const ErrorText = styled.p`
    margin: 0 1em;
    padding: 0;
    color: ${props => props.theme.pink};
    font-weight: 700;
  `;

  return (
    <ErrorWrap>
      <ErrorText>Standortbestimmung fehlgeschlagen!</ErrorText>
    </ErrorWrap>
  );
};


/**
 * Modal component displaying the current geolocation status.
 */
const InfoModal = props => {
  const { loading, error } = props;
  const duration = 400; // in ms

  console.log(loading || error);

  return (
    <Transition in={loading || error} timeout={duration}>
      {status => {
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
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
            case 'entered':
              style.transform = 'translateY(0)';
              style.opacity = 1;
              break;
            case 'exiting':
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
            default:
              style.transform = 'translateY(-50%)';
              style.opacity = 0;
              break;
          }
          return (
            <Wrapper style={{ ...style }}>
              <Inner>
                {(loading && !error) && <LoadingComponent />}
                {(loading && error) && <ErrorComponent />}
              </Inner>
            </Wrapper>
          );
        }
      }}
    </Transition>
  );
};

export default InfoModal;

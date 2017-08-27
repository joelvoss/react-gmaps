import React from 'react';
import styled from 'styled-components';
import Loader from 'components/LoadingOverlay/Loader';

/**
 * Simple loading component.
 * @param {object} props - Component properties.
 */
export const GeolocationLoading = props => {
  const LoadingWrap = styled.div`
    display: ${props => props.visible ? 'inline-flex' : 'none'};
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  const SmallLoader = styled(Loader)`
    width: 20px !important;
    height: 20px !important;
  `;

  const LoadingText = styled.p`
    margin: 0 1em;
    padding: 0;
    color: ${props => props.theme.colors.default.primary};
    font-weight: 700;
  `;

  return (
    <LoadingWrap visible={props.visible}>
      <SmallLoader />
      <LoadingText>{props.message}</LoadingText>
    </LoadingWrap>
  );
};

/**
 * Simple error component.
 * @param {object} props - Component properties.
 */
export const GeolocationError = props => {
  const ErrorWrap = styled.div`
    display: ${props => props.visible ? 'inline-flex' : 'none'};
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  const ErrorText = styled.p`
    margin: 0 1em;
    padding: 0;
    color: ${props => props.theme.colors.default.pink};
    font-weight: 700;

    a {
      font-weight: 400;
      color: ${props => props.theme.colors.default.pink};
    }
  `;

  return (
    <ErrorWrap visible={props.visible}>
      <ErrorText dangerouslySetInnerHTML={{__html: props.message}}></ErrorText>
    </ErrorWrap>
  );
};

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  bottom: 20px;
  left: -65px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  cursor: initial;
  overflow: hidden;
  border-radius: 6px;
  background: ${props => props.theme.lightGrey};

  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Close = styled.svg`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  stroke: ${props => props.theme.secondary};
  stroke-width: 2;
  cursor: pointer;

  $:hover {
    stroke-width: 3;
  }
`

const TriangleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const TDown = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${props => `${props.h}px ${props.w / 2}px 0 ${props.w / 2}px`};
  border-color: ${props => `${props.theme.lightGrey} transparent transparent transparent`};
`;

const Triangle = props => {
  return (
    <TriangleWrap>
      <TDown w={25} h={10} />
    </TriangleWrap>
  )
}

const InfoWindow = props => {
  return (
    <Wrapper>
      <Close viewBox="0 0 20 20" onClick={props.handleClose}>
        <path d="M0,0L20,20M20,0L0,20" />
      </Close>
      <Content>
        {/* Content */}
      </Content>
      <Triangle />
    </Wrapper>
  )
};

export default InfoWindow;

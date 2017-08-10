import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: ${props => `${props.w}px`};
  height: ${props => `${props.h}px`};
  bottom: 20px;
  left: ${props => `-${(props.w / 2) - 10}px`};
  pointer-events: auto;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: initial;
  border-radius: 6px;
  background: ${props => props.theme.lightGrey};

  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

const Icon = styled.div`
  position: absolute;
  top: ${props => `-${(props.w/3)}px`};
  left: 10px;
  width: ${props => `${props.w - 28}px`};
  height: ${props => `${props.w - 28}px`};
  background: ${props => props.theme.pink};
  border: 4px solid ${props => props.theme.white};
  border-radius: 50%;

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
`;

const TriangleWrap = styled.div`
  position: relative;
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
    <Wrapper w={props.w} h={props.h}>
      <Close viewBox="0 0 20 20" onClick={() => {
        console.log('close clicked...');
        props.handleClose();
      }}>
        <path d="M0,0L20,20M20,0L0,20" />
      </Close>
      <Content>
        {/* Content */}
        <Icon w={props.w} h={props.h} />
      </Content>
      <Triangle />
    </Wrapper>
  )
};

export default InfoWindow;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import InfoWindow from './InfoWindow';

/**
 * A circular pulse animation
 */
const pulse = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

/**
 * A fade in animation
 */
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Marker = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease-in forwards;
  animation-delay: ${props => `${props.delay}s`};
  pointer-events: all;

  transition: ${props => props.open ? 'transform 0s' : 'transform 0.07s ease-in'};
  backface-visibility: hidden;

  z-index: ${props => props.open ? '9999' : '1'};
  
  &:hover {
    transform: ${props => props.open ? 'scale(1)' : 'scale(1.2)'};
    z-index: 9999;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  background: #ed2461;
  border: 3px solid #fbd4e1;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

const Pulse = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: #ed2461;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform-origin: center;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${props => `${props.delay}s`};
  pointer-events: none;
`;


class CustomMarker extends Component {
  // PropTypes
  static propTypes = {
    delay: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }

  // Components state.
  state = {
    open: false
  }

  /**
   * Toggles the open state of the info window.
   */
  handleOpen = (action) => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  

  /**
   * React lifecycle method.
   * Renders the components ui.
   * @returns {jsx} - Components ui.
   */
  render () {
    const { delay } = this.props;
    const { open } = this.state;

    return (
      <Marker onClick={this.handleOpen} open={open}>
        <Pulse delay={delay * 0.5}/>
        <Inner />
        
        {open && <InfoWindow handleClose={this.handleClose}/>}
      </Marker>
    );
  }
}

export default CustomMarker;

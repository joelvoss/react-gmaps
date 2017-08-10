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
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Marker = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;

  transform: scale(0);
  opacity: 0;

  animation: ${fadeIn} 0.2s ease-in forwards;
  animation-delay: ${props => `${props.delay}s`};

  backface-visibility: hidden;
  z-index: ${props => props.open ? '9999' : '1'};
  
  &:hover {
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
  cursor: pointer;
  pointer-events: auto;

  transition: ${props => props.open ? 'transform 0s' : 'transform 0.07s ease-in'};

  &:hover {
    transform: ${props => props.open ? 'scale(1)' : 'scale(1.2)'};
  }
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
    data: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  }

  // Components state.
  state = {
    open: false
  }

  /**
   * Sets the open state of the infowindow to true.
   */
  handleOpen = () => {
    const { data, map } = this.props;
    
    // pan the map to the current marker location
    map.panTo({lat: data.geometry.location.lat, lng: data.geometry.location.lng});

    this.setState({open: true});
  }

  /**
   * Sets the open state of the infowindow to false.
   */
  handleClose = () => {
    this.setState({open: false});
  }

  /**
   * React lifecycle method.
   * Renders the components ui.
   * @returns {jsx} - Components ui.
   */
  render () {
    const { data, delay } = this.props;
    const { open } = this.state;

    return (
      <Marker open={open} delay={delay * 0.02}>
        <Pulse delay={delay * 0.5}/>
        <Inner onClick={this.handleOpen} />
        
        {open && <InfoWindow w={150} h={125} data={data} handleClose={this.handleClose}/>}
      </Marker>
    );
  }
}

export default CustomMarker;

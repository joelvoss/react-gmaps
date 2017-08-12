import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Input from './Input';
import Button from './Button';

class Autocomplete extends Component {
  
  state = {
    inputValue: ''
  }

  handleOnChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    const { inputValue } = this.state;

    return (
      <Wrapper>
        <Input type="text" placeholder="Auf der Karte suchen" value={inputValue} onChange={this.handleOnChange}/>
        <Button />
      </Wrapper>
    )
  }
}

export default Autocomplete;

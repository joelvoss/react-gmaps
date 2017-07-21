import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Img, BluredImg } from './Image';
import Wrapper from './Wrapper';

class LazyLoadImage extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const img = new Image();
    img.onload = () => this.setState({ loaded: true });
    img.src = this.props.src;
  }

  render() {
    const { placeholder, src } = this.props;
    const { loaded } = this.state;

    return (
      <Wrapper className={this.props.className}>
        <BluredImg source={placeholder} />
        {
          loaded && <Img source={src} />
        }
      </Wrapper>
    );
  }
}

export default LazyLoadImage;

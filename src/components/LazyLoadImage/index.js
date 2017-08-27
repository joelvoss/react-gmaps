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
      loaded: false,
      animation: true
    };
  }

  /**
   * When the component mounts, load the image source.
   * Only animate the image swap if the loading took longer than 100ms.
   */
  componentDidMount() {
    const start = Date.now();

    const img = new Image();
    img.onload = e => {
      const end = Date.now();
      const diff = end - start;

      this.setState({ loaded: true, animation: diff > 100 });
    };
    img.src = this.props.src;
  }

  render() {
    const { placeholder, src } = this.props;
    const { loaded, animation } = this.state;

    return (
      <Wrapper className={this.props.className}>
        <Img source={src} />
        <BluredImg source={placeholder} loaded={loaded} animation={animation} />
      </Wrapper>
    );
  }
}

export default LazyLoadImage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Placeholder, { IntrinsicPlaceholder } from './Placeholder';
import Image, { BluredImage } from './Image';

class LazyLoadImage extends Component {
  /**
   * PropTypes
   */
  static propTypes = {
    intrinsicHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      blurLoaded: false,
      imageLoaded: false
    };
  }

  render() {
    const { intrinsicHeight } = this.props;
    const { blurLoaded, imageLoaded } = this.state;

    return (
      <Placeholder className={this.props.className}>
        <BluredImage
          src={this.props.placeholder}
          onLoad={() => this.setState({ blurLoaded: true })}
          loaded={blurLoaded}
        />

        <IntrinsicPlaceholder paddingBottom={intrinsicHeight} />

        <Image src={this.props.src} onLoad={() => this.setState({ imageLoaded: true })} loaded={imageLoaded} />
      </Placeholder>
    );
  }
}

export default LazyLoadImage;

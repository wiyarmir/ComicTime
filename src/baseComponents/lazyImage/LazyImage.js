import React from "react";
import ProgressiveImage from "react-progressive-bg-image";
import LazyLoad from "react-lazy-load";

const style = {
  backgroundSize: "cover",
  backgroundPosition: "center center"
};

class LazyImage extends React.Component {
  render() {
    const height = this.props.height;
    const customStyle = this.props.style || style;
    return (
      <LazyLoad height={height} offsetTop={height} throttle={100}>
        <ProgressiveImage
          src={this.props.src}
          placeholder={this.props.placeholder}
          alt={this.props.alt}
          style={customStyle}
        />
      </LazyLoad>
    );
  }
}

export default LazyImage;

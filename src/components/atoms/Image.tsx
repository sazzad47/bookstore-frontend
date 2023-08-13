import React from 'react';
import ImageProps from '../../types/atoms/Image';

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  const imageStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
  };

  return <img src={src} alt={alt} style={imageStyle} className={className} />;
};

export default Image;

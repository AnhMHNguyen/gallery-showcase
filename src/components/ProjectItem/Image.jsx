import React from 'react';

const Image = ({ url, alt, opacity, parallaxPos, scale, rotationPos }) => {
  return (
    <img
      src={url}
      alt={alt}
      style={{
        opacity,
        transform: `translate3d(${parallaxPos.x}px,${parallaxPos.y}px, 0) rotate(${rotationPos}deg) scale(${scale})`
      }}
    />
  );
};

export default Image;

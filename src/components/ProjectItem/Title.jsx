import React from 'react';

const Title = ({ title, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div className='title-item'
      role="presentation"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <h1 className="menu-title">{ title }</h1>
      <h1 className="menu-title clone">{ title }</h1>
    </div>
  );
};

export default Title;

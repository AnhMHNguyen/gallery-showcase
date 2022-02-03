import React, { useContext, useState } from 'react';
import { CursorContext } from '../CustomCursor/CursorManager';
import { Hash } from 'react-feather';
import cn from 'classnames';
import "./style.scss";

const Header = () => {
  const [open, setOpen] = useState(false)
  const { setSize } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setSize("medium");
  }

  const handleMouseLeave = () => {
    setSize("small");
  }

  return (
    <>
      <div className="overlay-nav">
        <div className="header-container">
          <h2 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} role="presentation">collab</h2>
          <h2 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} role="presentation">studio</h2>
        </div>
      </div>
      <div
        className={cn('overlay-burger-icon', {'is-opened': open})}
        onClick={() => setOpen(!open)}
        role="presentation"
      />
      <div className={cn('overlay-burger-menu', { 'is-opened': open })}>
        <div className="burger-menu-header">
          <Hash size={16}/> menu
        </div>
        <h2>collab</h2>
        <h2>studio</h2>
      </div>
    </>
  );
};

export default Header;

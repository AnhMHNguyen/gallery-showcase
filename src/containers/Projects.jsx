import React, { useState, useRef, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectItem from '../components/ProjectItem';
import CursorManager from '../components/CustomCursor/CursorManager';
import CustomCursor from '../components/CustomCursor';
import { pageData } from '../data/data';
import "../styles/projects.scss";

const Projects = () => {
  const menuItems = useRef(null)
  const [renderItems, setRenderItems] = useState(pageData);

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const fitMax = Math.ceil(window.innerHeight / itemHeight);
    const cloneItems = [...renderItems].filter((_, index) => index < fitMax).map((target) => target);

    setRenderItems([...renderItems, ...cloneItems]);
    return cloneItems.length * itemHeight;
  }

  const getScrollPos = () => {
    return (
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) - (menuItems.current.clientTop || 0)
    )
  }

  const setScrollPos = (pos) => {
    menuItems.current.scrollTop = pos;
  }

  const initScroll = () => {
    const scrollPos = getScrollPos();
    console.log({scrollPos});
    if (scrollPos <= 0) {
      setScrollPos(1);
    }
  }

  useEffect(() => {
    const clonesHeight = cloneItems();
    initScroll();

    menuItems.current.style.scrollBehavior = "unset";

    const scrollUpdate = () => {
      const scrollPos = getScrollPos();
      if (clonesHeight + scrollPos >= menuItems.current.scrollHeight) {
        setScrollPos(1);
      } else if (scrollPos <= 0) {
        setScrollPos(clonesHeight + menuItems.current.childNodes[0].offsetHeight);
      }
    }
    menuItems.current.addEventListener('scroll', scrollUpdate);

    return () => {
      menuItems.current.removeEventListener('scroll', scrollUpdate);
    }
  }, [menuItems])
  
  return (
    <div className="main">
      {/* <CustomCursor /> */}
      <Header />
      <div className="main-container" id="main-container">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index}/>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;

import React, { useReducer, useRef, useContext } from 'react';
import Title from './Title';
import Image from './Image';
import { CursorContext } from '../CustomCursor/CursorManager';
import cn from 'classnames';
import { Hash } from 'react-feather';
import "./style.scss";
import { animate } from './animate';

const intialState = {
  opacity: 0,
  parallaxPos: { x: 0, y: -20 },
  scale: 0.8,
  rotationPos: 0,
  active: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "MOUSE/ENTER": {
      return {
        ...state,
        active: true
      };
    }
    case "MOUSE/LEAVE": {
      return {
        ...state,
        active: false
      };
    }
    case "CHANGE/OPACITY": {
      return {
        ...state,
        opacity: action.payload
      };
    }
    case "MOUSE/COORDINATES": {
      return {
        ...state,
        parallaxPos: action.payload
      }
    }
    case "CHANGE/ROTATION": {
      return {
        ...state,
        rotationPos: action.payload
      }
    }
    case "CHANGE/SCALE": {
      return {
        ...state,
        scale: action.payload
      }
    }
    default: {
      throw new Error();
    }
  }
}

const ProjectItem = ({ project, itemIndex }) => {
  const listItem = useRef(null);
  const { setSize } = useContext(CursorContext);
  const [state, dispatch] = useReducer(reducer, intialState)
  const easeMethod = 'easeInOutCubic';

  const parallax = (event) => {
    const speed = -5;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;

    dispatch({ type: 'MOUSE/COORDINATES', payload: {x, y} })
  }

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: 'CHANGE/OPACITY', payload: newOpacity });
        callback();
      },
      onComplete: () => { },
      duration: duration,
      easeMethod: easeMethod
    })
  }

  const handleScale = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newScale, callback) => {
        dispatch({ type: 'CHANGE/SCALE', payload: newScale });
        callback();
      },
      onComplete: () => { },
      duration: duration,
      easeMethod: easeMethod
    })
  }

  const handleRotation = (currentRotation, duration) => {
    //Random between -15 and 15
    const newRotation = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1)
    animate({
      fromValue: currentRotation,
      toValue: newRotation,
      onUpdate: (newRotation, callback) => {
        dispatch({ type: 'CHANGE/ROTATION', payload: newRotation });
        callback();
      },
      onComplete: () => { },
      duration: duration,
      easeMethod: easeMethod
    })
  }

  const handleMouseEnter = () => {
    handleScale(0.8, 1, 500);
    handleOpacity(0, 1, 500);
    handleRotation(state.rotationPos, 500);
    listItem.current.addEventListener('mousemove', parallax);
    dispatch({ type: 'MOUSE/ENTER' });
    setSize('regular');
  }

  const handleMouseLeave = () => {
    listItem.current.removeEventListener('mousemove', parallax)
    handleOpacity(1, 0, 800);
    handleScale(1, 0.8, 500);
    handleRotation(state.rotationPos, 500);
    dispatch({ type: 'MOUSE/COORDINATES', payload: intialState.parallaxPos });
    dispatch({ type: 'MOUSE/LEAVE' });
    setSize('small')
  }

  return (
    <li className="project-item-container" ref={ listItem}>
      <Title title={project.title} handleMouseLeave={handleMouseLeave} handleMouseEnter={handleMouseEnter}/>
      <Image
        url={project.url}
        alt={project.title}
        opacity={state.opacity}
        parallaxPos={state.parallaxPos}
        scale={state.scale}
        rotationPos={state.rotationPos}
      />
      
      <div className={cn("info-block", {'is-active': state.active})}>
        <p className="info-block-header">
          <span><Hash />0{ itemIndex }</span>
        </p>
        {project.info.map((element) => (
          <p key={element}><span>{ element }</span></p>
        ))}
      </div>
    </li>
  );
};

export default ProjectItem;

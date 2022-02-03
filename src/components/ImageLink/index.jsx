import { navigate } from 'gatsby';
import React, { useRef, useState, useEffect, useContext } from 'react';
// import { CursorContext } from '../CustomCursor/CursorManager';
import { SharedLayoutDataContext } from '../../containers/Layout/manager';
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';
import { defaultTransition } from '../../../utils/transition';
import './style.scss';


const ImageLink = ({ index, element}) => {
  const { slug, cover, color, title } = element;
  // const { setProjectTitle } = useContext(CursorContext);
  const {setCurrent, current, setValue} = useContext(SharedLayoutDataContext)
  const ref = useRef(null);
  const windowSizes = useWindowSize();
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const xPos = () => {
      if (!ref.current) return 0;
      const rect = ref.current.getBoundingClientRect();
      return windowSizes.width / 2 - rect.left - rect.width / 2;
    };
    
    const yPos = () => {
      if (!ref.current) return 0;
      const rect = ref.current.getBoundingClientRect();
      return windowSizes.height / 2 - rect.top - rect.height / 2;
    }
    
    setCoordinate({ x: xPos(), y: yPos() })
  },[windowSizes])
  
  const handleOnClick = () => {
    if (!ref.current) return;
    setCurrent(slug);

    const rect = ref.current.getBoundingClientRect();
    setValue({
      x: windowSizes.width / 2 - rect.width / 2,
      y: windowSizes.height / 2 - rect.height / 2,
      width: rect.width,
      height: rect.height
    });

    navigate(`/${slug}`);
  };

  const transitionDelay = index / 10 + 0.5;

  return (
    <motion.div
      ref={ref}
      className="content__slide-item"
      onClick={handleOnClick}
      exit={{
        x: coordinate.x,
        y: coordinate.y,
        zIndex: current === slug ? 100 : 0,
        transition: { 
          ...defaultTransition,
          delay: transitionDelay
        }
      }}
      // onMouseEnter={() => setProjectTitle(title)}
      // onMouseLeave={() => setProjectTitle("")}
    >
      <motion.div className="image-link-component"
        initial={{
          opacity: 0,
          scale: 0,
          backgroundColor: color
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ...defaultTransition,
            ease: 'easeInOut',
            delay: transitionDelay
          }
        }}
        exit={{
          opacity: current === slug ? 1 : 0,
          transition: {...defaultTransition, delay: 3}
        }}
      >
        <motion.img
          initial={{
            filter: "grayscale(1)"
          }}
          whileHover={{
            filter: "grayscale(0)",
            scale: 1.05,
            transition: { 
              ...defaultTransition,
              ease: 'easeInOut',
              duration: 0.6
            }
          }}
          exit={{
            opacity: current === slug ? 1 : 0,
            filter: current === slug && "grayscale(0)",
            transition: defaultTransition
          }}
          src={cover} alt={title} />
      </motion.div>
    </motion.div>
  );
};

export default ImageLink;

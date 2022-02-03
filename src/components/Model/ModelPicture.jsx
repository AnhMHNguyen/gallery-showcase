import React from 'react';
import { motion } from 'framer-motion';
import { defaultEase } from '../../../utils/transition';

const variants = {
  initial: { 
    opacity: 0,
    transition: {
      duration: 1,
      ease: defaultEase
    },
    position: 'absolute'
  },
  animate: { 
    opacity: 1,
    position: 'initial',
    transition: {
      duration: 1,
      ease: defaultEase,
      delay: 3.5
    }
  },
  // exit: { 
  //   opacity: 0,
  //   transition: {
  //     duration: 1,
  //     ease: defaultEase,
  //   }
  // }
}

const ModelPicture = ({ src, alt }) => {
  return <motion.img className="model-picture" src={src} alt={alt} variants={variants}
    initial="initial"
    animate="animate"
    // exit="exit"
  />;
};

export default ModelPicture;

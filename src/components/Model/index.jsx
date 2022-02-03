import React, { useRef, useState, useEffect } from 'react';
import ModelCover from './ModelCover';
import ModelPicture from './ModelPicture';
import ModelInfo from './ModelInfo';
import { motion } from 'framer-motion';
import { defaultEase } from '../../../utils/transition';
import useLocomotiveScroll from '../hooks/useLocomotiveScroll';
import './style.scss'

const Model = ({ pageContext }) => {
  const { cover, detailImages, title } = pageContext;
  const ref = useRef(null);
  const [locomotiveScroll] = useLocomotiveScroll(ref)
  const [locomotiveStart, setLocomotiveStart] = useState(false);

  useEffect(() => {
    if (locomotiveStart) {
      locomotiveScroll.current?.update();
    }
  },[locomotiveStart])

  return (
    <div data-scroll-container ref={ref}>
      <motion.div className="model-container"
        animate={{
          padding: '1vw',
          transition: {
            ease: defaultEase,
            delay: 3,
            duration: 0.5
          }
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
            ease: defaultEase,
          }
        }}
        onAnimationComplete={() => setLocomotiveStart(true)}
      >
        <ModelCover src={cover} alt={title}/>
        <ModelInfo title={title} />
        <div className="model-pictures">
          {detailImages.map((src, idx) => (
            <ModelPicture key={idx} src={src} alt={`img-${idx}`} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Model;

import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/src/locomotive-scroll.scss";

const useLocomotiveScroll = (ref) => {
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: ref.current,
        smooth: true,
        direction: "horizontal"
      });
    }

    return () => {
      locomotiveScrollRef.current?.destroy();
    }
  }, [ref]);

  return [locomotiveScrollRef];
}

export default useLocomotiveScroll;
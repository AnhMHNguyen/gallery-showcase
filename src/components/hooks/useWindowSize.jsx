import { useState, useEffect } from 'react';

const getSize = () => {
  const isClient = typeof window === "object";

  return {
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  };
}

const useWindowSize = () => {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowSize;
}

export default useWindowSize;
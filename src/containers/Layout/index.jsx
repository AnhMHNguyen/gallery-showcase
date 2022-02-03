import { AnimatePresence } from 'framer-motion';
import React from 'react';
import SharedLayoutData from './manager';
import CustomCursor from '../../components/CustomCursor';
import CustomManager from '../../components/CustomCursor/CursorManager';

const Layout = ({ children }) => {
  return (
    <CustomManager>
      <SharedLayoutData>
        <CustomCursor />
        <AnimatePresence exitBeforeEnter>
          {children}
        </AnimatePresence>
      </SharedLayoutData>
    </CustomManager>
  );
};

export default Layout;

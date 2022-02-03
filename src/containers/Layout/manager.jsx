import React, { createContext, useState } from 'react';

const initialState = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};

export const SharedLayoutDataContext = createContext({
  current: "",
  setCurrent: () => { },
  contextValue: initialState,
  setValue: () => { }
});

const SharedLayoutData = ({ children }) => {
  const [current, setCurrent] = useState("");
  const [contextValue, setContextValue] = useState(initialState);

  return (
    <SharedLayoutDataContext.Provider
      value={{
        current,
        setCurrent,
        contextValue,
        setValue: setContextValue
      }}
    >
      { children }
    </SharedLayoutDataContext.Provider>
  );
}

export default SharedLayoutData;
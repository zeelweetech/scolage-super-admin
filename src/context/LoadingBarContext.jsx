import React, { createContext, useContext } from "react";
import { useState } from "react";

const LoadingBarContext = createContext();

export const useLoadingBar = () => {
   const context = useContext(LoadingBarContext);
   if (!context) {
      throw new Error("useLoadingBar must be used within a LoadingBarProvider");
   }
   return context;
};

export const LoadingBarProvider = ({ children }) => {
   const [progress, setProgress] = useState(0);

   const setProgressBar = (value) => {
      setProgress(value);
   };

   return <LoadingBarContext.Provider value={{ progress, setProgressBar }}>{children}</LoadingBarContext.Provider>;
};

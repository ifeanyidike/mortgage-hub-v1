// HeaderContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

type HeaderSettings = {
  color: string;
};

const HeaderContext = createContext<HeaderSettings>({ color: "black" });

export const useHeaderSettings = () => useContext(HeaderContext);

export const HeaderProvider: React.FC<{
  settings: HeaderSettings;
  children: ReactNode;
}> = ({ settings, children }) => {
  return (
    <HeaderContext.Provider value={settings}>{children}</HeaderContext.Provider>
  );
};

"use client";

import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultContextValue: ContextProps = {
  darkMode: false,
  toggleDarkMode: () => {},
};

export const MyContext = createContext<ContextProps>(defaultContextValue);

const Context: FC<ProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <MyContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;

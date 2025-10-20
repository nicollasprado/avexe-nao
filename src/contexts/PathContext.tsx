"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface IPathContext {
  currentPath: string;
  pathHistory: string[];
  pushPath: (path: string) => void;
  getLastPath: () => string;
}

const PathContext = createContext<IPathContext>({
  currentPath: "",
  pathHistory: [],
  pushPath: () => {},
  getLastPath: () => "",
});

interface IPathProviderProps {
  children: ReactNode;
}

export const PathProvider = ({ children }: IPathProviderProps) => {
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  const pushPath = (path: string): void => {
    if (currentPath != "") setPathHistory((prev) => [...prev, currentPath]);

    setCurrentPath(path);
  };

  const getLastPath = (): string => {
    if (pathHistory.length === 0) return "/";

    const last = pathHistory[pathHistory.length - 1];
    setPathHistory((prev) => {
      return prev.slice(0, -1);
    });
    setCurrentPath(last);

    return last;
  };

  return (
    <PathContext.Provider
      value={{ currentPath, pushPath, getLastPath, pathHistory }}
    >
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => {
  const context = useContext(PathContext);

  return context;
};

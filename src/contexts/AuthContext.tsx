"use client";

import IAuthUser from "@/interfaces/IAuthUser";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {},
  logout: () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IAuthUser | null>(null);

  const login = async (email: string, password: string) => {
    const req = await axios.post<IAuthUser>("/api/authenticate", {
      email,
      password,
    });

    if (req.status === 200) {
      setIsAuthenticated(true);
      setUser(req.data);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

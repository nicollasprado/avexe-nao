"use client";

import IRegisterUserDTO from "@/interfaces/dtos/IRegisterUserDTO";
import IAuthUser from "@/interfaces/IAuthUser";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: IRegisterUserDTO) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IAuthUser | null>(null);

  const login = async (email: string, password: string) => {
    const req = await axios.post<IAuthUser>("/api/auth/login", {
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

  const register = async (user: IRegisterUserDTO) => {
    const req = await axios.post("/api/auth/register", user);

    if (req.status === 201) {
      setIsAuthenticated(true);
      setUser(req.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

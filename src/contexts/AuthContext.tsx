"use client";

import ILoginDTO from "@/interfaces/dtos/ILoginDTO";
import IRegisterUserDTO from "@/interfaces/dtos/IRegisterUserDTO";
import IAuthUser from "@/interfaces/IAuthUser";
import { apiService } from "@/services/ApiService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  isAuthenticated: boolean | null;
  user: IAuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: IRegisterUserDTO) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      const res = await apiService.axios.post<IAuthUser>(
        "/api/me",
        {},
        { validateStatus: (status) => status < 500 }
      );

      setIsAuthenticated(res.status === 200);
    };

    checkIsAuthenticated();
  }, [user]);

  const login = async (email: string, password: string) => {
    const req = await apiService.axios.post<ILoginDTO>("/api/auth/login", {
      email,
      password,
    });
    if (req.status === 200) {
      setUser(req.data.user);
      apiService.setAccessToken(req.data.token);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (user: IRegisterUserDTO) => {
    const req = await apiService.axios.post("/api/auth/register", user);

    if (req.status === 201) {
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

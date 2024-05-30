import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthProps {
  authState?: { authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    birthdate: Date,
    mail: string,
    password: string
  ) => Promise<any>;
  onLogin?: (mail: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const API_URL = "https://virtual-sentinel-5db263dece23.herokuapp.com";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
  }>({
    authenticated: null,
  });

  useEffect(() => {}, []);

  const register = async (
    firstName: string,
    lastName: string,
    birthdate: Date,
    mail: string,
    password: string
  ) => {
    try {
      return await axios.post(`${API_URL}/users/signup`, {
        firstName,
        lastName,
        birthdate,
        mail,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (mail: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/login`, {
        mail,
        password,
      });
      console.log(result.data);

      setAuthState({ authenticated: true });
    } catch (error) {
      console.log(error);
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    // reset le state

    setAuthState({ authenticated: false });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { API_URL } from "../constants/index";

interface AuthProps {
  authState?: { authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    birthdate: Date,
    mail: string,
    password: string,
    gender: string
  ) => Promise<any>;
  onLogin?: (mail: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

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

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuthState({ authenticated: true });
      }
    };

    checkToken();
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    birthdate: Date,
    mail: string,
    password: string,
    gender: string
  ) => {
    try {
      return await axios.post(`${API_URL}/users/signup`, {
        firstName,
        lastName,
        birthdate,
        mail,
        password,
        gender,
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

      // Enregistrez le token dans le secure storage
      await AsyncStorage.setItem("token", result.data.token);

      setAuthState({ authenticated: true });
    } catch (error) {
      console.log(error);
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    // reset le state
    await AsyncStorage.removeItem("token");
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

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    birthdate: Date,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_SECRET = "";
export const API_URL = "";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      // récupère le token du localStorage
      const token = await SecureStore.getItemAsync(TOKEN_SECRET);
      if (token) {
        setAuthState({ token, authenticated: true });
        // attache le token à toutes les requêtes axios
        axios.defaults.headers.common["Authorization"] = `${token}`;
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };
    loadToken();
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    birthdate: Date,
    email: string,
    password: string
  ) => {
    try {
      return await axios.post(`${API_URL}/users/signup`, {
        firstName,
        lastName,
        birthdate,
        email,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      console.log(result.data);

      setAuthState({ token: result.data.token, authenticated: true });

      // attache le token à toutes les requêtes axios
      axios.defaults.headers.common["Authorization"] = `${result.data.token}`;

      //   équivalent du localStorage pour React Native
      await SecureStore.setItemAsync(TOKEN_SECRET, result.data.token);
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    //  supprime le token du localStorage
    await SecureStore.deleteItemAsync(TOKEN_SECRET);
    // supprime le token des requêtes axios
    axios.defaults.headers.common["Authorization"] = null;
    // reset le state
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

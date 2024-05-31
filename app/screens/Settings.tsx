import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";
import Loading from "./Loading";

export default function Settings() {
  const [token, setToken] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        console.log("Token retrieved:", token);
        const decodedToken = jwtDecode(token);
        const { id, mail, role } = decodedToken;

        const result = await axios.get(`${API_URL}/users/${id}`);
        console.log("User data:", result.data);

        let ROLE_NAME = "";
        if (role === 1) {
          ROLE_NAME = "Administrateur";
        } else if (role === 2) {
          ROLE_NAME = "Créateur de contenu";
        } else if (role === 3) {
          ROLE_NAME = "Utilisateur";
        } else if (role === 4) {
          ROLE_NAME = "Sentinel";
        }

        setRoleName(ROLE_NAME);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <Text>Settings</Text>
      <Text>ROLE: {roleName}</Text>
    </View>
  );
}

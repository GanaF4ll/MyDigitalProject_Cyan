import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import { AuthProvider, useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";
import Loading from "../components/Loading";
import { IconInput } from "../components/IconInput";

export default function Settings() {
  const [token, setToken] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        // console.log("Token retrieved:", token);
        const decodedToken = jwtDecode(token);
        const { id, mail, role } = decodedToken;

        const result = await axios.get(`${API_URL}/users/${id}`);
        // console.log("User data:", result.data);

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
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={settingStyles.container}
      >
        <View style={settingStyles.header}>
          <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
            <FontAwesome
              name="sign-out"
              size={15}
              color={colors.green_primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white" }}>Settings</Text>
        <Text style={{ color: "white" }}>ROLE: {roleName}</Text>
        <IconInput
          iconName="search"
          placeholder="yoooo"
          iconColor="aquamarine"
          placeholderColor="red"
        />
      </ImageBackground>
    </View>
  );
}

const settingStyles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "5%",
    paddingTop: "10%",
    flexDirection: "column",
  },
});

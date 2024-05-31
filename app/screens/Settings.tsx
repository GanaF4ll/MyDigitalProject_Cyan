import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";

export default function Settings() {
  const [token, setToken] = useState("");

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        console.log("Token retrieved:", token);
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  return (
    <View>
      <Text>Settings</Text>
      <Text></Text>
    </View>
  );
}

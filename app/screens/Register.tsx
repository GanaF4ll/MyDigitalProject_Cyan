import { View, Text, ImageBackground, TextInput } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { API_URL } from "../constants";
import { useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";

export default function Register() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <Text style={{ color: "white" }}>Register</Text>
      </ImageBackground>
    </View>
  );
}

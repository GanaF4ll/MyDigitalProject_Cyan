import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { API_URL } from "../constants";
import { useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import Gradient from "../components/Gradient";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const navigation = useNavigation();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/test`);
      console.log(result.data);
    };
    testCall();
  }, []);

  const register = async () => {
    const result = await onRegister!(
      firstName,
      lastName,
      new Date(birthdate),
      email,
      password
    );
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={require("../assets/images/LogoWhite.png")} />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <Text
              style={styles.label}
              aria-label="Label for Email"
              nativeID="labelMail"
            >
              Email
            </Text>
            <TextInput
              autoCapitalize="none"
              style={[styles.input, { marginTop: 5 }]}
              placeholder="virtualsentinel@exemple.com"
              onChangeText={(text) => setEmail(text)}
              value={email}
              aria-labelledby="labelMail"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <Text
              style={styles.label}
              aria-label="Label for Password"
              nativeID="labelPassword"
            >
              Mot de passe
            </Text>
            <TextInput
              style={[styles.input, { marginTop: 5 }]}
              placeholder="**********"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              aria-labelledby="labelPassword"
            />
          </View>
          <Gradient onPress={login}>
            <Text style={styles.title_white}>Connexion</Text>
          </Gradient>

          <Text style={{ color: "white", marginTop: 10 }}>
            Pas de compte ?
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate({ name: "Register" })}
            >
              Créez-en un
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;

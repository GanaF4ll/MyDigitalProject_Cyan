import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import axios from "axios";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={[styles.container, { backgroundColor: colors.blue_primary }]}
      >
        <Image
          source={require("../../assets/images/Logotype 4.png")}
          style={styles.logo}
        />
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
            style={[styles.input, { marginTop: 5 }]}
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
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
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            aria-labelledby="labelPassword"
          />
        </View>
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.title_blue}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

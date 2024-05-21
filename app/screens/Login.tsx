import { View, Text, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../../constants/styles";

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
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logotype 4.png")}
        style={styles.logo}
      />
      <View>
        <TextInput
          //   style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        ></TextInput>

        <TextInput
          //   style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword}
          value={password}
        ></TextInput>
        <Button onPress={login} title="Connexion"></Button>
      </View>
    </View>
  );
};

export default Login;

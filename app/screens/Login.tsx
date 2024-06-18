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
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { API_URL } from "../constants";
import { useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import Gradient from "../components/Gradient";
import { IconInput } from "../components/IconInput";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const navigation = useNavigation();

  const login = async () => {
    const result = await onLogin!(mail, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <StatusBar barStyle="light-content" />

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
            {/* <TextInput
              autoCapitalize="none"
              style={[styles.input, { marginTop: 5 }]}
              placeholder="virtualsentinel@exemple.com"
              onChangeText={(text) => setMail(text)}
              value={mail}
              aria-labelledby="labelMail"
            /> */}
            <IconInput
              iconName="envelope"
              placeholder="virtualsentinel@exemple.com"
              iconColor={colors.blue_primary}
              onChangeText={(text) => setMail(text)}
              value={mail}
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
            {/* <TextInput
              style={[styles.input, { marginTop: 5 }]}
              placeholder="**********"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              aria-labelledby="labelPassword"
            /> */}
            <IconInput
              iconName="lock"
              placeholder="**********"
              iconColor={colors.blue_primary}
              onChangeText={(text) => setPassword(text)}
              password={true}
              value={password}
            />
          </View>
          <Gradient onPress={login}>
            <Text style={styles.title_white}>Connexion</Text>
          </Gradient>

          <Text style={{ color: "white", marginTop: 10 }}>
            Pas de compte ?
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate({ name: "Créer un compte" })}
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

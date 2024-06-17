import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { API_URL } from "../constants";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { useAuth } from "../context/AuthContext";
import Gradient from "../components/Gradient";
import { IconInput } from "../components/IconInput";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const { onRegister, onLogin } = useAuth();

  const updateBirthdate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setBirthdate(currentDate);
  };

  const register = async () => {
    if (onRegister) {
      try {
        let existingUser;
        try {
          existingUser = await axios.get(`${API_URL}/users/mail/${mail}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("L'utilisateur n'existe pas, on peut continuer.");
          } else {
            throw error;
          }
        }

        if (existingUser && existingUser.data === mail) {
          alert("L'email que vous avez entré est déjà utilisé.");
          return;
        }

        // Validation de la force du mot de passe
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{7,}$/;
        if (!passwordRegex.test(password)) {
          alert(
            "Le mot de passe doit contenir au moins 8 caractères, dont des majuscules, des minuscules, des chiffres et des symboles spéciaux."
          );
          return;
        }

        // Création de l'utilisateur
        const result = await onRegister!(
          firstName,
          lastName,
          birthdate,
          mail,
          password,
          gender
        );

        if (result.error) {
          alert("Une erreur est survenue lors de l'inscription.");
        } else {
          console.log("Inscription réussie");
          onLogin!(mail, password);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else {
      console.log("onRegister is undefined");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView horizontal={false}>
        <StatusBar barStyle="light-content" />

        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ImageBackground
            source={require("../assets/images/background.png")}
            style={styles.container}
          >
            <View style={{ width: "100%", height: "30%" }}>
              <Image source={require("../assets/images/LogoWhite.png")} />
            </View>
            {/* PRENOM */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <Text
                style={styles.label}
                aria-label="Label for firstName"
                nativeID="labelfirstName"
              >
                Prénom
              </Text>
              {/* <TextInput
                autoCapitalize="words"
                style={[styles.input, { marginTop: 5 }]}
                placeholder="John"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                aria-labelledby="labelfirstName"
              /> */}
              <IconInput
                iconName="user"
                placeholder="Votre prénom"
                iconColor={colors.orange_primary}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>

            {/* NOM */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <Text
                style={styles.label}
                aria-label="Label for lastName"
                nativeID="labellastName"
              >
                Nom
              </Text>
              {/* <TextInput
                autoCapitalize="words"
                style={[styles.input, { marginTop: 5 }]}
                placeholder="Doe"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                aria-labelledby="labellastName"
              /> */}
              <IconInput
                iconName="user"
                placeholder="Votre nom"
                iconColor={colors.orange_primary}
                onChangeText={(text) => setLastName(text)}
              />
            </View>

            {/* BIRTHDATE */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <Text
                style={styles.labelView}
                aria-label="Label for Birthdate"
                nativeID="labelBirthdate"
              >
                Date de naissance
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  width: 350,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              >
                <RNDateTimePicker
                  mode="date"
                  value={birthdate}
                  display="spinner"
                  onChange={updateBirthdate}
                  minimumDate={new Date(1901, 0, 1)}
                  // pas de moins de 13 ans
                  maximumDate={new Date(2011, 12, 31)}
                  aria-labelledby="labelBirthdate"
                />
              </View>
            </View>

            {/* GENDER */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <Text
                style={styles.labelView}
                aria-label="Label for gender"
                nativeID="labelGender"
              >
                Genre
              </Text>
              <View>
                <Picker
                  style={styles.picker}
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                  <Picker.Item label="Homme" value="male" />
                  <Picker.Item label="Femme" value="female" />
                  <Picker.Item label="Autre" value="other" />
                </Picker>
              </View>
            </View>

            {/* MAIL */}
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
                style={[styles.input, { marginTop: 5 }]}
                placeholder="virtualsentinel@exemple.com"
                onChangeText={(text) => setMail(text)}
                value={mail}
                aria-labelledby="labelMail"
              /> */}
              <IconInput
                iconName="envelope"
                placeholder="Votre adresse mail"
                iconColor={colors.orange_primary}
                onChangeText={(text) => setMail(text)}
              />
            </View>

            {/* PASSWORD */}
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
                style={[styles.input, { marginTop: 5, marginBottom: 15 }]}
                placeholder="**********"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
                aria-labelledby="labelPassword"
              /> */}
              <IconInput
                iconName="lock"
                placeholder="**********"
                iconColor={colors.orange_primary}
                onChangeText={(text) => setPassword(text)}
                password={true}
              />
            </View>

            <Gradient onPress={register}>
              <Text style={styles.title_white}>Inscription</Text>
            </Gradient>
          </ImageBackground>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

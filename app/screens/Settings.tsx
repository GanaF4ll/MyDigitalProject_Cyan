import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import YouTubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";
import Loading from "../components/Loading";
import { IconInput } from "../components/IconInput";
import { imageMap } from "../constants/imageMap";
import { UserType } from "../constants/types";
import { notReady } from "../constants/shared";

export default function Settings() {
  const [token, setToken] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { authState, onLogout } = useAuth();
  const [user, setUser] = useState<UserType[]>([]);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        const decodedToken = jwtDecode(token);
        const { id, role } = decodedToken;

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
        setUser(result.data);
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
        <View style={{ width: "100%", height: "60%" }}>
          <LinearGradient
            colors={["#13325B", "#2B2361"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={settingStyles.miniBloc}
          >
            <View style={settingStyles.mbHeader}>
              <Text style={[styles.title_mm, { color: colors.orange_primary }]}>
                Mes informations
              </Text>
            </View>
            <View style={settingStyles.mbFooter}>
              <View style={settingStyles.labelDiv}>
                <Text
                  style={[styles.text, { marginBottom: 20, color: "white" }]}
                >
                  Téléphone :
                </Text>
                <Text
                  style={[styles.text, { marginBottom: 20, color: "white" }]}
                >
                  Adresse :
                </Text>
                <Text
                  style={[styles.text, { marginBottom: 20, color: "white" }]}
                >
                  Email :
                </Text>
                <Text
                  style={[styles.text, { marginBottom: 20, color: "white" }]}
                >
                  Rôle :
                </Text>
              </View>
              <View style={settingStyles.infoDiv}>
                <Text
                  style={[styles.text, { marginBottom: 20, color: "white" }]}
                >
                  {user.id}
                </Text>
                <Text
                  style={[styles.text, { marginBottom: 17, color: "white" }]}
                >
                  40 rue du chemin vert 75011, Paris
                </Text>
                <Text
                  style={[styles.text, { marginBottom: 22, color: "white" }]}
                >
                  {user.mail}
                </Text>
                <Text style={[styles.text, { color: "white" }]}>
                  {roleName}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={notReady}>
            <Text style={[styles.text_mm, { color: colors.orange_primary }]}>
              <FontAwesome
                name="lock"
                size={15}
                color={colors.orange_primary}
              />
              {"  "}
              Modifier mes informations
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text_mm, { color: colors.orange_primary }]}>
            <FontAwesome name="trash" size={15} color={colors.orange_primary} />
            {"  "}
            Supprimer mon compte
          </Text>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#50515E",
              marginTop: 15,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity onPress={onLogout}>
              <Text style={[styles.text_mm, { color: colors.orange_primary }]}>
                <FontAwesome
                  name="power-off"
                  size={15}
                  color={colors.orange_primary}
                />
                {"  "}
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  miniBloc: {
    width: "100%",
    height: "60%",
    borderWidth: 2,
    borderColor: "#2073BB",
    borderRadius: 24,
  },
  mbHeader: {
    height: "25%",
    width: "100%",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 5,
    paddingLeft: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "#2073BB",
  },
  mbFooter: {
    height: "75%",
    width: "100%",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    padding: 5,
    flexDirection: "row",
  },
  labelDiv: {
    width: "30%",
    height: "100%",
    alignItems: "center",
  },
  infoDiv: {
    width: "70%",
    height: "100%",
    flexDirection: "column",
    paddingLeft: 15,
  },
});

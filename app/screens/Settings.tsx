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
// import { Youtube } from "../components/Youtube";

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
        // console.log("Token retrieved:", token);
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
        console.log("User data:", result.data);
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
              <Text style={[styles.label, { marginBottom: 20 }]}>
                Téléphone :{"   "}
                <Text style={styles.text}>{user.id}</Text>
              </Text>
              <Text style={[styles.label, { marginBottom: 20 }]}>
                Adresse :{"   "}
                <Text style={styles.text}>
                  40 rue du chemin vert 75011, Paris
                </Text>
              </Text>
              <Text style={[styles.label, { marginBottom: 20 }]}>
                Email :{"   "}
                <Text style={styles.text}>{user.mail}</Text>
              </Text>
              <Text style={[styles.label, { marginBottom: 20 }]}>
                Rôle :{"   "}
                <Text style={styles.text}>{roleName}</Text>
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View>
          <Text style={[styles.title_mm, { color: colors.orange_primary }]}>
            <FontAwesome name="trash" size={15} color={colors.orange_primary} />
            {"  "}
            Supprimer mon compte
          </Text>
          <TouchableOpacity onPress={onLogout}>
            <Text style={[styles.title_mm, { color: colors.orange_primary }]}>
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
    height: "40%",
    width: "100%",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 5,
    paddingLeft: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  mbDivImage: {
    width: "30%",
    height: "100%",
    margin: "auto",
    // borderWidth: 2,
  },
  mbDivTitle: {
    width: "70%",
    height: "100%",
    margin: "auto",
    // borderWidth: 2,
    paddingLeft: 10,
    justifyContent: "center",
  },
  mbFooter: {
    height: "40%",
    width: "100%",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    padding: 5,
    flexDirection: "column",
  },
});

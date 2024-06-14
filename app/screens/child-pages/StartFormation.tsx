import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import styles from "../../constants/styles";
import { FormationProps } from "../../components/Formation";
import { API_URL } from "../../constants";
import { imageMap } from "../../constants/imageMap";
import { LinearGradient } from "expo-linear-gradient";
import { minutesToHour } from "../../constants/shared";
import { Chapter } from "../../components/Chapter";

type StackParamList = {
  StartFormation: {
    formationData: FormationProps;
  };
};

type StartFormationRouteProp = RouteProp<StackParamList, "StartFormation">;

export default function StartFormation() {
  const route = useRoute<StartFormationRouteProp>();
  const { formationData } = route.params;
  const [author, setAuthor] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios.get(
        `${API_URL}/users/${formationData.author_id}`
      );

      const authorFullName = `${result.data.firstName} ${result.data.lastName}`;

      switch (formationData.difficulty) {
        case "easy":
          setDifficulty("Facile");
          break;
        case "medium":
          setDifficulty("Moyen");
          break;
        case "hard":
          setDifficulty("Difficile");
          break;
        default:
          setDifficulty("X");
      }
      setAuthor(authorFullName);
      setCompletionTime(minutesToHour(formationData.completionTime));
    };
    const fetchChapters = async () => {
      const result = await axios.get(
        `${API_URL}/chapters/formation/${formationData.id}`
      );

      setChapters(result.data);
    };
    fetchAuthor();
    retrieveToken();
    fetchChapters();
  }, []);
  console.log(formationData);
  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        const decodedToken = jwtDecode(token);
        const { id, mail, role } = decodedToken;

        const result = await axios.get(`${API_URL}/users/${id}`);

        const { firstName, lastName } = result.data;
        setUserName(`${firstName} ${lastName}`);
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  console.log(formationData);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={SFstyles.container}
        source={require("../../assets/images/background.png")}
      >
        <View style={SFstyles.miniBloc}>
          <View style={{ width: "100%", height: "60%" }}>
            <LinearGradient
              colors={["#0B111A99", "#252360"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={SFstyles.mbHeader}
            >
              <View style={SFstyles.mbDivImage}>
                <Image
                  source={imageMap[formationData.image]}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              </View>
              <View style={SFstyles.mbDivTitle}>
                <Text style={styles.title_white}>{formationData.title}</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={SFstyles.mbFooter}>
            <View
              style={[
                SFstyles.section3,
                { borderRightWidth: 1, borderColor: "#252360" },
              ]}
            >
              <Text style={{ color: "white" }}>Durée</Text>
              <Text style={{ color: "#81A3FF" }}>{completionTime}</Text>
            </View>

            <View
              style={[
                SFstyles.section3,
                {
                  borderRightWidth: 1,
                  borderColor: "#252360",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ color: "white" }}>Difficulté</Text>
              <Text style={{ color: "#81A3FF" }}>{difficulty}</Text>
            </View>
            <View style={[SFstyles.section3, { alignItems: "flex-end" }]}>
              <Text style={{ color: "white" }}>Notes</Text>
              <Text style={{ color: "#81A3FF" }}>
                {formationData.difficulty}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "white" }}>Auteur: {author}</Text>
        <Text style={{ color: "white" }}>user: {userName}</Text>
        <Text style={{ color: "white" }}>{formationData.description}</Text>

        <ScrollView>
          {chapters.map((chapter: any) => (
            <LinearGradient
              colors={["#370475", "#0B111A99"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 10, margin: 10 }}
              key={chapter.id}
            >
              <Chapter
                title={chapter.title}
                order={chapter.order}
                paywall={formationData.isPro}
                completionTime={chapter.completionTime}
                formation_id={chapter.formation_id}
                image={formationData.image}
                content={chapter.content}
              />
            </LinearGradient>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const SFstyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5%",
    paddingTop: "15%",
  },
  miniBloc: {
    width: "100%",
    height: "24%",
    borderWidth: 2,
    borderColor: "#3E3D9C",
    borderRadius: 24,
  },
  mbHeader: {
    // backgroundColor: "lime",
    height: "100%",
    width: "100%",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
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
    backgroundColor: "#050A13",
    height: "40%",
    width: "100%",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    padding: 5,
    flexDirection: "row",
  },
  section3: {
    width: "33%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 24,
  },
});

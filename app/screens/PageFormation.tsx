import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import { Formation } from "../components/Formation";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";
import { FormationType } from "../constants/types";

export default function PageFormation() {
  const [formations, setFormations] = useState<FormationType[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const result = await axios.get(`${API_URL}/formations/all`);
      setFormations(result.data);
      // console.log(result.data);
    };
    fetchFormations();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View style={styles.header_container}>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text style={[{ color: colors.blue_primary }]}>Formations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text style={[{ color: colors.blue_primary }]}>En cours</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text
              style={[
                {
                  color: colors.blue_primary,
                  fontFamily: 'fontFamily: "Montserrat-semibold"',
                },
              ]}
            >
              Terminées
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={false}>
          {formations.map((formation) => (
            <TouchableOpacity
              key={formation.id}
              onPress={() => console.log(formation)}
            >
              <LinearGradient
                colors={["#370475", "#0B111A99"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 10, margin: 10 }}
              >
                <Formation
                  id={formation.id}
                  author={formation.author}
                  title={formation.title}
                  description={formation.description}
                  video={formation.video}
                  category={formation.category}
                  difficulty={formation.difficulty}
                  qualityRating={formation.qualityRating}
                  coverImage={formation.coverImage}
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

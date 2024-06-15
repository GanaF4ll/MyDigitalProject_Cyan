import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import { API_URL, localFormations } from "../constants/index";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { FormationType } from "../constants/types";
import { Formation } from "../components/Formation";

export default function PageFormation() {
  const [formations, setFormations] = useState<FormationType[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const result = await axios.get(`${API_URL}/formations/all`);
      const fullFormations = [];

      for (let i = 0; i < result.data.length; i++) {
        if (localFormations[i].id === result.data[i].id) {
          fullFormations.push({
            ...result.data[i],
            image: localFormations[i].image,
            isPro: localFormations[i].isPro,
          });
        }
      }

      setFormations(fullFormations);
      // console.log(fullFormations);
    };
    fetchFormations();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View style={styles.header_container}>
          <TouchableOpacity style={styles.header_button}>
            <Text style={[{ color: colors.blue_primary }]}>Formations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header_button}>
            <Text style={[{ color: colors.blue_primary }]}>En cours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header_button}>
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
            <LinearGradient
              colors={["#370475", "#0B111A99"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 10, margin: 10 }}
              key={formation.id}
            >
              <Formation
                id={formation.id}
                author_id={formation.author_id}
                title={formation.title}
                description={formation.description}
                video={formation.video}
                category={formation.category}
                difficulty={formation.difficulty}
                qualityRating={formation.qualityRating}
                coverImage={formation.coverImage}
                completionTime={formation.completionTime}
                image={formation.image}
                // square={true}
              />
            </LinearGradient>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

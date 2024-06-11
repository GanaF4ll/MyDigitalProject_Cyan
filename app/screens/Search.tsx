import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import { Formation } from "../components/Formation";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL, localCategories } from "../constants/index";
import { FormationType } from "../constants/types";
import { SmallCategory } from "../components/SmallCategory";

export default function Search() {
  const [formations, setFormations] = useState<FormationType[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const result = await axios.get(`${API_URL}/formations/all`);
      setFormations(result.data);
      console.log(result.data);
    };
    fetchFormations();
  }, []);

  const fetchFormationsByCategory = async (category_id: number) => {
    const result = await axios.get(
      `${API_URL}/formations/category/${category_id}`
    );
    setFormations(result.data);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View style={styles.header_container}>
          {localCategories.map((category) => (
            <TouchableOpacity
              onPress={() => fetchFormationsByCategory(category.id)}
            >
              <View style={SearchStyles.filter}>
                <SmallCategory
                  key={category.id}
                  id={category.id}
                  // name={category.name}
                  image={category.image}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView>
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

const SearchStyles = StyleSheet.create({
  filter: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "seagreen",
    borderRadius: 10,
    margin: 2,
    padding: 5,
  },
});

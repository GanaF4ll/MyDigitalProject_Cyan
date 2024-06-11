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
import { CategoryType, FormationType } from "../constants/types";
import { SmallCategory } from "../components/SmallCategory";
import Loading from "../components/Loading";

export default function Search() {
  const [formations, setFormations] = useState<FormationType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      const result = await axios.get(`${API_URL}/formations/all`);
      setFormations(result.data);
      // console.log(result.data);
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get(`${API_URL}/categories/all`);

      const fullCategories = [];

      // récupère les images et descriptions des catégories locales
      for (let i = 0; i < result.data.length; i++) {
        if ((localCategories[i].id = result.data[i].id)) {
          fullCategories.push({
            ...result.data[i],
            image: localCategories[i].image,
            description: localCategories[i].description,
          });
        }
      }
      setCategories(fullCategories);
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const fetchFormationsByCategory = async (category_id: number) => {
    setIsLoading(true);

    const result = await axios.get(
      `${API_URL}/formations/category/${category_id}`
    );
    setFormations(result.data);
    setIsLoading(false);
  };

  if (isLoading) {
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
                <View style={SearchStyles.filterBox}>
                  <SmallCategory
                    key={category.id}
                    id={category.id}
                    filterName={category.filterName}
                    image={category.image}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Loading />
        </ImageBackground>
      </View>
    );
  }

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
              <View style={SearchStyles.filterBox}>
                <SmallCategory
                  key={category.id}
                  id={category.id}
                  filterName={category.filterName}
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
  filterBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 2,
    padding: 5,
  },
});

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL, localCategories, localFormations } from "../constants/index";
import { CategoryType, FormationType } from "../constants/types";
import { Category } from "../components/Category";
import { Formation } from "../components/Formation";

const Home = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formations, setFormations] = useState<FormationType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get(`${API_URL}/categories/all`);
      // console.log(result.data);

      const fullCategories = [];

      // récupère les images et descriptions des catégories locales
      for (let i = 0; i < result.data.length; i++) {
        if (localCategories[i].id === result.data[i].id) {
          fullCategories.push({
            ...result.data[i],
            image: localCategories[i].image,
            description: localCategories[i].description,
          });
        }
      }
      // console.log(fullCategories);
      setCategories(fullCategories);
    };
    fetchCategories();
  }, []);

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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View style={{ height: 225 }}>
          <Text style={styles.title_white}>Catégories:</Text>
          <ScrollView horizontal={true}>
            {categories.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                image={category.image}
              />
            ))}
          </ScrollView>
        </View>
        <View style={{ height: 250 }}>
          <Text style={styles.title_white}>Formations vedettes:</Text>
          <ScrollView horizontal={true}>
            {formations.map((formation) => (
              <TouchableOpacity
                key={formation.id}
                // onPress={() => console.log(formation)}
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
                  image={formation.image}
                  completionTime={formation.completionTime}
                  square={true}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const homestyle = StyleSheet.create({
  searchInput: {
    opacity: 0.8,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

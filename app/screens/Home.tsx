import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL, localCategories } from "../constants/index";
import { Category } from "../components/Category";
import { CategoryType } from "../constants/types";

const Home = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get(`${API_URL}/categories/all`);
      // console.log(result.data);

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
      // console.log(fullCategories);
      setCategories(fullCategories);
    };
    fetchCategories();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
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
});

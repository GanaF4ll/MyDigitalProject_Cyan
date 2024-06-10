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
import { API_URL } from "../constants/index";
import Category from "../components/Category";
import { CategoryType } from "../constants/types";

const Home = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <ScrollView horizontal={true}>
          {categories.map((category) => (
            <Category
            // key={category.id}
            // id={category.id}
            // title={category.title}
            // description={category.description}
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

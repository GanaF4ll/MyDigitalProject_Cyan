import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../constants/styles";
import { CategoryType } from "../constants/types";
import Gradient from "./Gradient";

interface CategoryProps extends CategoryType {
  id: number;
  title: string;
  description: string;
}

export default function Category() {
  return (
    <View style={categoryStyle.container}>
      <LinearGradient
        colors={["#370475", "red"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 3 }}
        style={categoryStyle.subContainer}
      >
        <Text style={styles.title_white}>Fondamentaux de la cybersécurité</Text>
        <Gradient onPress={() => console.log("yo")}>
          <Text style={styles.title_white}>
            Continuer <FontAwesome name="arrow-right" size={10} color="white" />
          </Text>
        </Gradient>
      </LinearGradient>
    </View>
  );
}

const categoryStyle = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    margin: 3,
    borderRadius: 10,
  },
  subContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 10,
  },
  header: {
    width: "100%",
    height: "20%",
  },
});

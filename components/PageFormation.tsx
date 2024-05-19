import { View, Text } from "react-native";
import React from "react";
import { Formation } from "./Formation";
import styles from "../constants/styles";
import { FORMATIONS } from "../constants";

export default function PageFormation() {
  return (
    <View style={styles.container}>
      {FORMATIONS.map((formation) => (
        <Formation
          key={formation.id}
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
      ))}
    </View>
  );
}

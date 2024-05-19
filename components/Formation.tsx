import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../constants/styles";
import { FORMATIONS } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface FormationProps {
  id: number;
  author_id: number;
  title: string;
  description: string;
  video: string;
  category_id: number;
  difficulty: string;
  qualityRating: number;
  coverImage: string;
}

export const Formation: React.FC<FormationProps> = (props) => {
  return (
    <View style={styles.formation}>
      <Image
        source={{ uri: props.coverImage }}
        style={{ width: 100, height: 100 }}
      />
      <Text key={props.id} style={styles.title_blue}>
        {props.title}
      </Text>
    </View>
  );
};

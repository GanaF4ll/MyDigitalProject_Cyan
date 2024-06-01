import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../constants/styles";
import { FormationType } from "../constants/types";

interface FormationProps extends FormationType {
  id: number;
  title: string;
  description: string;
  video: string;
  difficulty: string;
  qualityRating: number;
  coverImage: string;
  category?: number;
}

export const Formation: React.FC<FormationProps> = (props) => {
  let image_url;

  if (props.category === 1) {
    image_url = require("../assets/images/mock1.jpg");
  }

  return (
    <View style={styles.formation}>
      <View style={styles.image_container}>
        <Image
          source={image_url}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>

      <View style={styles.formation_content}>
        <Text style={styles.title_white}>{props.category}</Text>
        <Text key={props.id} style={styles.title_white}>
          {props.title}
        </Text>
        <Text style={{ color: "white" }}>{props.description}</Text>
      </View>
    </View>
  );
};

import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import styles from "../constants/styles";
// import { FORMATIONS } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FormationType } from "../constants/types";

interface FormationProps extends FormationType {
  id: number;
  title: string;
  description: string;
  video: string;
  difficulty: string;
  qualityRating: number;
  coverImage: string;
}

export const Formation: React.FC<FormationProps> = (props) => {
  return (
    <View style={styles.formation}>
      <View style={styles.image_container}>
        <Image
          source={{ uri: props.coverImage }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>

      <View style={styles.formation_content}>
        <Text style={styles.title_orange}>{props.category}</Text>
        <Text key={props.id} style={styles.title_blue}>
          {props.title}
        </Text>
        <Text>{props.description}</Text>
      </View>
    </View>
  );
};

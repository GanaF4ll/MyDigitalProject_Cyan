import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { minutesToHour } from "../constants/shared";
import styles from "../constants/styles";
import { imageMap } from "../constants/imageMap";

export interface ChapterProps {
  // id pour faire la liaison avec la version locale des chapitres, à retirer pour la version finale

  id: number;
  title: string;
  order: number;
  paywall: boolean;
  completionTime: number;
  formation_id: number;
  image: string;
  video: string;
  contents: {
    title: string;
    text: string;
  }[];
}

export const Chapter: React.FC<ChapterProps> = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("PageChapter", { chapter: props });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      key={props.order}
      style={styles.formation}
    >
      <View style={styles.image_container}>
        <Image
          source={imageMap[props.image]}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>

      <View style={styles.formation_content}>
        <Text style={styles.title_white}>{props.title}</Text>
        <Text style={{ color: "white" }}>{props.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

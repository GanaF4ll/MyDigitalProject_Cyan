import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../constants/styles";
import { FormationType } from "../constants/types";
import { imageMap } from "../constants/imageMap";

interface FormationProps extends FormationType {
  id: number;
  title: string;
  description: string;
  video: string;
  difficulty: string;
  qualityRating: number;
  image: string;
  category?: number;
  completionTime?: number;
  square?: boolean;
}

export const Formation: React.FC<FormationProps> = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("StartFormation", { id: props.id });
  };

  if (props.square === true) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <ImageBackground
          borderRadius={15}
          fadeDuration={1}
          // source={props.image}
          source={imageMap[props.image]}
          style={FormaStyles.imgcontainer}
        >
          <View style={FormaStyles.header}>
            <FontAwesome
              name="heart-o"
              size={20}
              onPress={() => {
                console.log("yo");
              }}
            />
          </View>
          <View style={FormaStyles.body}>
            <Text style={FormaStyles.title}>{props.title}</Text>
          </View>
          <View style={FormaStyles.footer}>
            <Text style={FormaStyles.title}>{props.difficulty}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.formation}>
      <View style={styles.image_container}>
        <Image
          source={imageMap[props.image]}
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

const FormaStyles = StyleSheet.create({
  imgcontainer: {
    flexDirection: "column",
    height: 220,
    width: 330,
    padding: 20,
    marginRight: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    opacity: 0.5,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    textShadowColor: "#000",
    textShadowOffset: {
      width: 2,
      height: 1,
    },
    textShadowRadius: 5,
    opacity: 1,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
    // borderWidth: 2,
    height: "20%",
  },
  footer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
    // borderWidth: 2,
    height: "20%",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
    // borderWidth: 2,
    height: "60%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: "100%",
  },
});

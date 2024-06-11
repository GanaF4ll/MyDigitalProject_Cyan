import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormationType } from "../constants/types";

interface SmallFormationProps
  extends Pick<FormationType, "id" | "title" | "coverImage" | "difficulty"> {
  id: number;
  title: string;
  coverImage: string;
  difficulty: string;
  completionTime: number;
  qualityRating: number;
  category_id: number;
}
export const SmallFormation: React.FC<SmallFormationProps> = (props) => {
  // export default function SmallFormation() {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.id);
      }}
    >
      <ImageBackground
        borderRadius={15}
        fadeDuration={1}
        source={props.coverImage}
        style={styles.imgcontainer}
      >
        <View style={styles.header}>
          <FontAwesome
            name="heart-o"
            size={20}
            onPress={() => {
              console.log("yo");
            }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>{props.difficulty}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    flexDirection: "column",
    // justifyContent: "flex-end",
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
});

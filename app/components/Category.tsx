import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../constants/styles";
import { CategoryType } from "../constants/types";
import Gradient from "./Gradient";

interface CategoryProps extends CategoryType {
  id: number;
  name: string;
  description: string;
  image: string;
}
export const Category: React.FC<CategoryProps> = (props) => {
  return (
    <View style={categoryStyle.container}>
      <LinearGradient
        colors={["#370475", "red"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 3 }}
        style={categoryStyle.subContainer}
      >
        {/* HEADER */}
        <View style={categoryStyle.header}>
          <Text
            style={[
              styles.title_white,
              {
                flexWrap: "wrap",
                maxWidth: "100%",
                width: undefined,
                textAlign: "left",
              },
            ]}
          >
            {props.name}
          </Text>
        </View>
        {/* BODY */}
        <View style={categoryStyle.body}>
          <View style={categoryStyle.bodyLeftDiv}>
            <Text style={{ color: "white", marginBottom: 10 }}>
              {props.description}
            </Text>
            <View style={{ width: "80%" }}>
              <Gradient onPress={() => console.log("category_id =>", props.id)}>
                <Text style={styles.title_white}>
                  Continuer{" "}
                  <FontAwesome name="arrow-right" size={10} color="white" />
                </Text>
              </Gradient>
            </View>
          </View>
          <View style={categoryStyle.bodyRightDiv}>
            <Image
              source={props.image}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </View>
        </View>

        {/* FOOTER */}
      </LinearGradient>
    </View>
  );
};

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
    height: "25%",
  },
  body: {
    width: "100%",
    height: "65%",
    flexDirection: "row",
  },
  bodyLeftDiv: {
    width: "60%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bodyRightDiv: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
  },
});

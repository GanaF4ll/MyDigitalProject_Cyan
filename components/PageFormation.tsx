import { View, Text } from "react-native";
import React from "react";
import { Formation } from "./Formation";
import styles from "../constants/styles";

export default function PageFormation() {
  return (
    <View>
      <Text>Test</Text>
      <Formation
        id={1}
        title="Title"
        description="Description"
        image="Image URL"
        level="Beginner"
        category="Category"
        tags={["tag1", "tag2"]}
        author="Author Name"
      />
    </View>
  );
}

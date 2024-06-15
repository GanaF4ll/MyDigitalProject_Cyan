import { View, Text } from "react-native";
import React from "react";

import styles from "../constants/styles";

interface ParagraphProps {
  title: string;
  text: string;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <View style={{ marginBottom: 15, width: "100%" }}>
      <Text style={styles.title_orange}>{props.title}</Text>
      <Text style={[styles.text, { color: "white" }]}>{props.text}</Text>
    </View>
  );
};

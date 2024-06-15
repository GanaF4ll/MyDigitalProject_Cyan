import { View, Text } from "react-native";
import React from "react";

import styles from "../constants/styles";

interface ParagraphProps {
  title: string;
  text: string;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <View>
      <Text>Paragraph</Text>
    </View>
  );
};

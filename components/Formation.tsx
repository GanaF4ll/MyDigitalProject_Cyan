import { View, Text } from "react-native";
import React from "react";
import styles from "../constants/styles";
import { FORMATIONS } from "../constants";

interface FormationProps {
  id: number;
  title: string;
  description: string;
  image: string;
  level: string;
  category: string;
  tags: string[];
  author: string;
}

export const Formation: React.FC<FormationProps> = (props) => {
  return (
    <View>
      <Text key={props.id}>{props.title}</Text>
    </View>
  );
};

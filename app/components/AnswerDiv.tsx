import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import styles from "../constants/styles";

export interface AnswerDivProps {
  question_id: number;
  question: string;
  chapter_id: number;
  answers: {
    id: number;
    content: string;
    valid: 0 | 1;
  }[];
}

export const AnswerDiv: React.FC<AnswerDivProps> = (props) => {
  const [current, setCurrent] = useState("test");

  return (
    <View>
      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={current}
        onSelected={(value) => setCurrent(value)}
        radioBackground="green"
      >
        <RadioButtonItem
          value={props.answers.valid}
          label={
            <Text style={styles.title_white}>
              Example passing React Element
            </Text>
          }
        />
      </RadioButtonGroup>
    </View>
  );
};

const ADstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

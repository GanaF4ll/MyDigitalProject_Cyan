import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../constants/styles";
import { colors } from "../constants/styles";

interface IconInputProps {
  iconName: string;
  iconColor?: string;
  placeholder: string;
  placeholderColor?: string;
  onChangeText?: (text: string) => void;
  content?: string;
  color?: string;
}
export const IconInput: React.FC<IconInputProps> = (props) => {
  return (
    <View style={IconInputStyles.container}>
      <FontAwesome
        name={props.iconName}
        size={20}
        color={props.iconColor || props.color || "black"}
        style={IconInputStyles.icon}
      />
      <TextInput
        style={IconInputStyles.input}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderColor || props.color || "black"}
        onChangeText={props.onChangeText}
      >
        {props.content}
      </TextInput>
    </View>
  );
};

const IconInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "white",
  },
  input: {
    color: colors.blue_primary,
    flex: 1,
    width: "90%",
    height: 40,
    borderLeftWidth: 2,
    padding: 5,
  },
  icon: {
    width: "10%",
    marginRight: 10,
    alignItems: "center",
    paddingLeft: 18,
  },
});

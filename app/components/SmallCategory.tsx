import { View, Text, Image } from "react-native";
import React from "react";
import { CategoryType } from "../constants/types";

interface SmallCategoryProps {
  id: number;
  filterName: string;
  image: string;
}
export const SmallCategory: React.FC<SmallCategoryProps> = (props) => {
  return (
    <View style={{ height: "80%", borderRadius: 10, alignItems: "center" }}>
      <Image
        source={props.image}
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
      />
      <Text style={{ color: "white", fontSize: 10 }}>{props.filterName}</Text>
    </View>
  );
};

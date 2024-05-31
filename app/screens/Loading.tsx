import { View, Text, Image } from "react-native";
import React from "react";

import styles from "../constants/styles";
import { colors } from "../constants/styles";

export default function Loading() {
  return (
    <View style={[styles.container, { backgroundColor: colors.blue_primary }]}>
      <Image
        source={require("../assets/images/Logotype 4.png")}
        style={styles.logo}
      />
    </View>
  );
}

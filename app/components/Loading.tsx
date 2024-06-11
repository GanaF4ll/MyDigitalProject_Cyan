import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

import styles from "../constants/styles";
import { colors } from "../constants/styles";

export default function Loading() {
  return (
    <View style={{ width: "100%", height: "80%" }}>
      <ActivityIndicator size="large" color={colors.orange_primary} />
    </View>
  );
}

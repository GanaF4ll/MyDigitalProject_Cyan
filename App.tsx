import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import style from "./constants/styles";

export default function App() {
  return (
    <View style={style.container}>
      <Text style={style.text_green_primary}>??</Text>
      <StatusBar style="auto" />
    </View>
  );
}

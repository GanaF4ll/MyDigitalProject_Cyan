import { StyleSheet } from "react-native";

const blue_primary = "#193762";
const orange_primary = "#DB8B34";
const green_primary = "#A3EDBF";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formation: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: green_primary,
    borderWidth: 2,
    color: blue_primary,
  },
  test: {
    color: orange_primary,
  },
});

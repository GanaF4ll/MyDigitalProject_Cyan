import { StyleSheet } from "react-native";
import * as Font from "expo-font";

const blue_primary = "#193762";
const orange_primary = "#FCA311";
const green_primary = "#A3EDBF";

export const colors = {
  blue_primary,
  orange_primary,
  green_primary,
};

Font.loadAsync({
  "Montserrat-semibold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  formation: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 135,
    minWidth: 300,
    borderRadius: 10,
    margin: 5,
    padding: 15,
  },
  test: {
    color: orange_primary,
  },
  title_blue: {
    fontSize: 18,
    fontWeight: "bold",
    color: blue_primary,
    fontFamily: "Montserrat-semibold",
  },
  title_white: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E5E5E5",
    fontFamily: "Montserrat-semibold",
  },
  title_orange: {
    fontSize: 18,
    fontWeight: "bold",
    color: orange_primary,
    fontFamily: "Montserrat-semibold",
  },
  image_container: {
    height: "100%",
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  formation_content: {
    flexDirection: "column",
    height: "100%",
    width: "70%",
    color: "white",
  },
  logo: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  input: {
    height: 40,
    margin: 12,
    width: 350,
    borderRadius: 10,
    borderColor: blue_primary,
    borderWidth: 1,
    backgroundColor: "white",
    color: blue_primary,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    fontFamily: "Montserrat-semibold",
    marginBottom: 5,
    paddingLeft: 15,
  },
  labelView: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    fontFamily: "Montserrat-semibold",
    marginBottom: 5,
    paddingLeft: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  btn_logout: {
    backgroundColor: blue_primary,
    padding: 10,
    borderRadius: 8,
    width: 30,
    alignItems: "center",
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    // backgroundColor: blue_primary,
  },
  header_button: {
    backgroundColor: "#E5E5E5",
    // padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  picker: {
    width: 350,
    height: 200,
    borderWidth: 2,
    borderRadius: 18,
    backgroundColor: "white",
  },
});

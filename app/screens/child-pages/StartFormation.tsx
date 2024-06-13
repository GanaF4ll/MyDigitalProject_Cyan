import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import axios from "axios";

import styles from "../../constants/styles";
import { FormationProps } from "../../components/Formation";
import { API_URL } from "../../constants";
import { imageMap } from "../../constants/imageMap";

type StackParamList = {
  StartFormation: {
    formationData: FormationProps;
  };
};

type StartFormationRouteProp = RouteProp<StackParamList, "StartFormation">;

export default function StartFormation() {
  const route = useRoute<StartFormationRouteProp>();
  const { formationData } = route.params;
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios.get(
        `${API_URL}/users/${formationData.author_id}`
      );

      const authorFullName = `${result.data.firstName} ${result.data.lastName}`;

      console.log(authorFullName);
      setAuthor(authorFullName);
    };
    fetchAuthor();
  }, []);

  console.log(formationData);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={SFstyles.container}
        source={require("../../assets/images/background.png")}
      >
        <View style={SFstyles.miniBloc}>
          <View style={SFstyles.mbHeader}>
            <View style={SFstyles.mbDivImage}>
              <Image
                source={imageMap[formationData.image]}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
              />
            </View>
            <View style={SFstyles.mbDivTitle}>
              <Text>Title</Text>
            </View>
          </View>

          <View style={SFstyles.mbFooter}></View>
        </View>
        <Text style={{ color: "white" }}>StartFormation</Text>
        <Text style={{ color: "white" }}>{author}</Text>
        <Text style={{ color: "white" }}>{formationData.description}</Text>
      </ImageBackground>
    </View>
  );
}

const SFstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5%",
    paddingTop: "15%",
  },
  miniBloc: {
    width: "100%",
    height: "24%",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 24,
  },
  mbHeader: {
    backgroundColor: "lime",
    height: "50%",
    width: "100%",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 5,
    flexDirection: "row",
  },
  mbDivImage: {
    width: "30%",
    height: "100%",
    margin: "auto",
    borderWidth: 2,
  },
  mbDivTitle: {
    width: "70%",
    height: "100%",
    margin: "auto",
    borderWidth: 2,
  },
  mbFooter: {
    backgroundColor: "aqua",
    height: "50%",
    width: "100%",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    padding: 5,
  },
});

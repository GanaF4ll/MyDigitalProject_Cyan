import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

import styles from "../../constants/styles";
import { AnswerDiv } from "../../components/AnswerDiv";
import { API_URL } from "../../constants";

export default function Quizz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const route = useRoute();
      const { chapter } = route.params;
      console.log(chapter);
      // const response = await axios.get("http://localhost:3000/questions");
      // console.log(response.data);
    };
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={Qstyles.container}
      >
        <View style={Qstyles.header}>
          <Text style={styles.title_purple}>Quizz</Text>
        </View>
        <View style={Qstyles.body}>
          <AnswerDiv
            question_id={1}
            question="Quelle est la couleur du ciel ?"
            chapter_id={1}
            answers={[
              { id: 1, content: "Bleu", valid: 1 },
              { id: 2, content: "Vert", valid: 0 },
              { id: 3, content: "Rouge", valid: 0 },
              { id: 4, content: "Jaune", valid: 0 },
            ]}
          />
        </View>
        <View style={Qstyles.footer}></View>
      </ImageBackground>
    </View>
  );
}

const Qstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5%",
    paddingTop: "15%",
    flexDirection: "column",
  },
  header: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgreen",
  },
  body: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightseagreen",
  },
  footer: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightcoral",
  },
});

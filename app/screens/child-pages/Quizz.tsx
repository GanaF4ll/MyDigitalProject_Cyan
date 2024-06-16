import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

import styles from "../../constants/styles";
import { AnswerDiv } from "../../components/AnswerDiv";
import { API_URL } from "../../constants";
import { QuestionType, AnswerType } from "../../constants/types";

export default function Quizz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const route = useRoute();

  const { chapter_id } = route.params || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/questions/chapter/${chapter_id}`
        );

        const questionsWithAnswers: QuestionType[] = await Promise.all(
          response.data.map(async (question: any) => {
            const responseAnswer = await axios.get(
              `${API_URL}/answers/question/${question.id}`
            );

            const answers: AnswerType[] = responseAnswer.data;

            // const correct_answer = answers.find((answer) => answer.valid);

            return {
              id: question.id,
              chapter_id: question.chapter_id,
              content: question.content,
              correct_answer: true,
              answers: answers,
            };
          })
        );

        setQuestions(questionsWithAnswers);
        console.log("questionsWithAnswers", questionsWithAnswers);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };

    fetchQuestions();
  }, [chapter_id]);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={Qstyles.container}
      >
        <View style={Qstyles.header}>
          <Text style={styles.title_purple}></Text>
        </View>
        <View style={Qstyles.body}>
          <ScrollView>
            {questions.map((question, index) => (
              <AnswerDiv
                key={question.id}
                question_id={question.id}
                // answers={question.answers.map((answer) => {}}={answer}
                question={question.content}
                chapter_id={question.chapter_id}
                // valid={question.correct_answer}
              />
            ))}
          </ScrollView>
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

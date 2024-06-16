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
import _ from "lodash"; // Importer lodash
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import styles from "../../constants/styles";
import { API_URL } from "../../constants";
import { QuestionType, AnswerType } from "../../constants/types";

export default function Quizz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const route = useRoute();

  const { chapter_id } = route.params || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/questions/chapter/${chapter_id}`
        );
        if (!response.data) {
          throw new Error("Aucune question trouvée");
        }
        const questionsWithAnswers = await Promise.all(
          response.data.map(async (question) => {
            try {
              const responseAnswer = await axios.get(
                `${API_URL}/answers/question/${question.id}`
              );
              if (!responseAnswer.data) {
                throw new Error(
                  `Aucune réponse trouvée pour la question ${question.id}`
                );
              }

              // Mélanger les réponses avant de les retourner
              const shuffledAnswers = _.shuffle(responseAnswer.data);

              return {
                ...question,
                answers: shuffledAnswers,
              };
            } catch (error) {
              console.error(
                `Erreur lors de la récupération des réponses: ${error}`
              );
              return null; // Ou gérer autrement
            }
          })
        );
        const validQuestions = questionsWithAnswers.filter((q) => q !== null);
        setQuestions(validQuestions);
      } catch (error) {
        console.error(`Erreur lors de la récupération des questions: ${error}`);
      }
    };

    fetchQuestions();
  }, [chapter_id]);

  const handleAnswerSelect = (questionId, answerValue) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerValue,
    }));
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={Qstyles.container}
      >
        <View style={Qstyles.header}>
          <Text style={styles.title_purple}>Quiz</Text>
        </View>
        <View style={Qstyles.body}>
          <ScrollView
            style={{
              height: 300,
              borderColor: "purple",
              borderWidth: 2,
              width: "100%",
            }}
          >
            {questions.map((question, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={styles.title_orange}>{question.content}</Text>
                <RadioButtonGroup
                  containerStyle={{ marginBottom: 10 }}
                  selected={selectedAnswers[question.id]}
                  onSelected={(value) => handleAnswerSelect(question.id, value)}
                  radioBackground="green"
                >
                  {question.answers.map((answer, answerIndex) => (
                    <RadioButtonItem
                      key={answerIndex}
                      value={answer.content}
                      style={{ marginVertical: 5 }}
                    >
                      <Text style={[styles.text, { color: "white" }]}>
                        {answer.content}
                      </Text>
                    </RadioButtonItem>
                  ))}
                </RadioButtonGroup>
              </View>
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

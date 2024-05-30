import { View, Text, ScrollView } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { Formation } from "../components/Formation";
import styles from "../constants/styles";
import { FORMATIONS } from "../constants";
import { API_URL } from "../constants/index";
import { FormationType } from "../constants/types";
import axios from "axios";

export default function PageFormation() {
  const [formations, setFormations] = useState<FormationType[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const result = await axios.get(`${API_URL}/formations/all`);
      setFormations(result.data);
      console.log(result.data);
    };
    fetchFormations();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {FORMATIONS.map((formation) => (
          <Formation
            key={formation.id}
            id={formation.id}
            author={formation.author}
            title={formation.title}
            description={formation.description}
            video={formation.video}
            category={formation.category}
            difficulty={formation.difficulty}
            qualityRating={formation.qualityRating}
            coverImage={formation.coverImage}
          />
        ))}
      </ScrollView>
    </View>
  );
}

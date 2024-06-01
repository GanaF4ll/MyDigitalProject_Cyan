import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

import { Formation } from "../components/Formation";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL } from "../constants/index";
import { FormationType } from "../constants/types";

import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function Search() {
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
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View style={styles.header_container}>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text style={[{ color: colors.blue_primary }]}>Formations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text style={[{ color: colors.blue_primary }]}>En cours</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.header_button}
          >
            <Text
              style={[
                {
                  color: colors.blue_primary,
                  fontFamily: "Montserrat-semibold",
                },
              ]}
            >
              Terminées
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={formations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => console.log(item)}
              style={{ borderRadius: 10, margin: 10 }}
            >
              <LinearGradient
                colors={["#370475", "#0B111A99"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 10 }}
              >
                <Formation
                  id={item.id}
                  author={item.author}
                  title={item.title}
                  description={item.description}
                  video={item.video}
                  category={item.category}
                  difficulty={item.difficulty}
                  qualityRating={item.qualityRating}
                  coverImage={item.coverImage}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    </View>
  );
}

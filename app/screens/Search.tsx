import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

import { Formation } from "../components/Formation";
import styles from "../constants/styles";
import { colors } from "../constants/styles";
import { API_URL, localCategories, localFormations } from "../constants/index";
import { CategoryType, FormationType } from "../constants/types";
import { SmallCategory } from "../components/SmallCategory";
import Loading from "../components/Loading";
import { IconInput } from "../components/IconInput";

export default function Search() {
  const [formations, setFormations] = useState<FormationType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const result = await axios.get(`${API_URL}/formations/all`);
        const fullFormations = result.data.map((formation) => {
          const localFormation = localFormations.find(
            (lf) => lf.id === formation.id
          );
          return localFormation
            ? {
                ...formation,
                image: localFormation.image,
                isPro: localFormation.isPro,
              }
            : formation;
        });

        setFormations(fullFormations);
        // console.log(fullFormations);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      }
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get(`${API_URL}/categories/all`);
        const fullCategories = result.data.map((category) => {
          const localCategory = localCategories.find(
            (lc) => lc.id === category.id
          );
          return localCategory
            ? {
                ...category,
                image: localCategory.image,
                description: localCategory.description,
              }
            : category;
        });

        setCategories(fullCategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchFormationsByTitle = async (formation_title) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${API_URL}/formations/title/${formation_title}`
      );
      const fullFormations = result.data.map((formation) => {
        const localFormation = localFormations.find(
          (lf) => lf.id === formation.id
        );
        return localFormation
          ? {
              ...formation,
              image: localFormation.image,
              isPro: localFormation.isPro,
            }
          : formation;
      });

      setFormations(fullFormations);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des formations par titre:",
        error
      );
    }
    setIsLoading(false);
  };

  const fetchFormationsByCategory = async (category_id) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${API_URL}/formations/category/${category_id}`
      );
      const fullFormations = result.data.map((formation) => {
        const localFormation = localFormations.find(
          (lf) => lf.id === formation.id
        );
        return localFormation
          ? {
              ...formation,
              image: localFormation.image,
              isPro: localFormation.isPro,
            }
          : formation;
      });

      // console.log(fullFormations);
      setFormations(fullFormations);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des formations par catégorie:",
        error
      );
    }
    setIsLoading(false);
  };

  const reset = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(`${API_URL}/formations/all`);
      const fullFormations = result.data.map((formation) => {
        const localFormation = localFormations.find(
          (lf) => lf.id === formation.id
        );
        return localFormation
          ? {
              ...formation,
              image: localFormation.image,
              isPro: localFormation.isPro,
            }
          : formation;
      });

      setFormations(fullFormations);
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation des formations:",
        error
      );
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={require("../assets/images/background.png")}
          style={styles.container}
        >
          <View style={{ width: "100%", marginVertical: 10 }}>
            <IconInput
              iconName="search"
              placeholder="Chercher une formation"
              color={colors.blue_primary}
              onChangeText={(text) => fetchFormationsByTitle(text)}
            />
          </View>
          <View style={styles.header_container}>
            {localCategories.map((category) => (
              <TouchableOpacity
                onPress={() => fetchFormationsByCategory(category.id)}
              >
                <View style={SearchStyles.filterBox}>
                  <SmallCategory
                    key={category.id}
                    id={category.id}
                    filterName={category.filterName}
                    image={category.image}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Loading />
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.container}
      >
        <View
          style={{
            width: "100%",
            marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <IconInput
            iconName="search"
            placeholder="Chercher une formation"
            color={colors.blue_primary}
            onChangeText={(text) => fetchFormationsByTitle(text)}
          />
          <TouchableOpacity
            onPress={() => reset()}
            style={{
              borderRadius: 10,
              // backgroundColor: "red",
              width: 35,
              height: 35,
              alignItems: "center",
              marginTop: 5,
              // paddingLeft: 2,
              // paddingTop: 2,
              padding: "auto",
              borderWidth: 1,
              borderColor: "red",
            }}
          >
            <FontAwesome name="close" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.header_container}>
          {localCategories.map((category) => (
            <TouchableOpacity
              onPress={() => fetchFormationsByCategory(category.id)}
            >
              <View style={SearchStyles.filterBox}>
                <SmallCategory
                  key={category.id}
                  id={category.id}
                  filterName={category.filterName}
                  image={category.image}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView>
          {formations.map((formation) => (
            <TouchableOpacity
              key={formation.id}
              onPress={() => console.log(formation)}
            >
              <LinearGradient
                colors={["#370475", "#0B111A99"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 10, margin: 10 }}
              >
                <Formation
                  key={formation.id}
                  id={formation.id}
                  author_id={formation.author_id}
                  title={formation.title}
                  description={formation.description}
                  video={formation.video}
                  category={formation.category}
                  difficulty={formation.difficulty}
                  qualityRating={formation.qualityRating}
                  coverImage={formation.coverImage}
                  completionTime={formation.completionTime}
                  image={formation.image}
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const SearchStyles = StyleSheet.create({
  filterBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 2,
    padding: 5,
  },
});

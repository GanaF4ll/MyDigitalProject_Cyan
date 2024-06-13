import { View, Text } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import styles from "../../constants/styles";
import { FormationProps } from "../../components/Formation";
import { API_URL } from "../../constants";
import axios from "axios";

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
    <View style={styles.container}>
      <Text>StartFormation</Text>
      <Text>{author}</Text>
      <Text>{formationData.description}</Text>
    </View>
  );
}

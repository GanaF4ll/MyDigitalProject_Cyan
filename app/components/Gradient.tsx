import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

import styles from "../constants/styles";

type GradientProps = {
  children: React.ReactNode;
  onPress: () => void;
};

export default function Gradient({ children, onPress }: GradientProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#2F284A", "#0F55E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.button}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}

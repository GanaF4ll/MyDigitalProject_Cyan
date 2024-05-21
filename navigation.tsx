import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import Home from "./app/screens/Home";
import Settings from "./app/screens/Settings";
import Search from "./app/screens/Search";
import PageFormation from "./app/screens/PageFormation";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: "home" | "search" | "book" | "user-circle";

            if (route.name === "Accueil") {
              iconName = "home";
            } else if (route.name === "Rechercher") {
              iconName = "search";
            } else if (route.name === "Formations") {
              iconName = "book";
            } else if (route.name === "Profil") {
              iconName = "user-circle";
            } else {
              return null;
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Rechercher" component={Search} />
        <Tab.Screen name="Formations" component={PageFormation} />
        <Tab.Screen name="Profil" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

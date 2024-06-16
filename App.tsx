import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { AuthProvider, useAuth } from "./app/context/AuthContext";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import PageFormation from "./app/screens/PageFormation";
import Search from "./app/screens/Search";
import React from "react";
import Settings from "./app/screens/Settings";
import styles, { colors } from "./app/constants/styles";
import Register from "./app/screens/Register";
import StartFormation from "./app/screens/child-pages/StartFormation";
import PageChapter from "./app/screens/child-pages/PageChapter";
import Quizz from "./app/screens/child-pages/Quizz";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      {authState?.authenticated ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof FontAwesome.glyphMap;

              switch (route.name) {
                case "Accueil":
                  iconName = "home";
                  break;
                case "Rechercher":
                  iconName = "search";
                  break;
                case "Formations":
                  iconName = "book";
                  break;
                case "Profil":
                  iconName = "user-circle";
                  break;
                default:
                  return null;
              }

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarBackgroundColor: "#00040E",
            tabBarActiveTintColor: colors.green_primary,
            tabBarStyle: { backgroundColor: "#080B30" },
          })}
        >
          <Tab.Screen
            name="Accueil"
            component={HomeStack}
            options={{
              tabBarLabel: "Accueil",
            }}
          />
          <Tab.Screen
            name="Formations"
            component={FormationStack}
            options={{
              tabBarLabel: " Mes Formations",
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
                  <FontAwesome name="home" size={10} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Rechercher"
            component={SearchStack}
            options={{
              tabBarLabel: "Rechercher",
            }}
          />
          <Tab.Screen
            name="Profil"
            component={SettingsStack}
            options={{
              tabBarLabel: "Profil",
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerTitle: null,
            headerShown: false,
          })}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Créer un compte" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartFormation"
        component={StartFormation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PageChapter"
        component={PageChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quizz"
        component={Quizz}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const FormationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PageFormation"
        component={PageFormation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartFormation"
        component={StartFormation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PageChapter"
        component={PageChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quizz"
        component={Quizz}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartFormation"
        component={StartFormation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PageChapter"
        component={PageChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quizz"
        component={Quizz}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StartFormationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartFormation"
        component={StartFormation}
        options={{ headerShown: false }}
      />
      {/* Ajoutez cette ligne pour inclure PageChapter */}
      <Stack.Screen
        name="PageChapter"
        component={PageChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quizz"
        component={Quizz}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

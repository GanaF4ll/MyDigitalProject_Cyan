import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import style from "./app/constants/styles";
import AppNavigator from "./navigation";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import PageFormation from "./app/screens/PageFormation";
import Search from "./app/screens/Search";
import React from "react";
import Settings from "./app/screens/Settings";
import styles from "./app/constants/styles";
import Register from "./app/screens/Register";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
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
          })}
        >
          <Tab.Screen
            name="Accueil"
            component={Home}
            options={{
              tabBarLabel: "Accueil",
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
                  <FontAwesome name="home" size={10} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Formations"
            component={PageFormation}
            options={{
              tabBarLabel: "Formations",
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
                  <FontAwesome name="home" size={10} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Rechercher"
            component={Search}
            options={{
              tabBarLabel: "Rechercher",
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
                  <FontAwesome name="home" size={10} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={Settings}
            options={{
              tabBarLabel: "Profil",
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={styles.btn_logout}>
                  <FontAwesome name="home" size={10} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

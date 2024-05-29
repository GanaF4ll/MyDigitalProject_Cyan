import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import style from "./constants/styles";
import AppNavigator from "./navigation";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import PageFormation from "./app/screens/PageFormation";
import Search from "./app/screens/Search";

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
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              headerRight: () => (
                <Button onPress={onLogout} title="Déconnexion" />
              ),
            }}
          />
          <Tab.Screen
            name="PageFormation"
            component={PageFormation}
            options={{
              tabBarLabel: "Formation",
              headerRight: () => (
                <Button onPress={onLogout} title="Déconnexion" />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarLabel: "Search",
              headerRight: () => (
                <Button onPress={onLogout} title="Déconnexion" />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

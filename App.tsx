import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import style from "./constants/styles";
import AppNavigator from "./navigation";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";

const Stack = createStackNavigator();

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
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <Button onPress={onLogout} title="Déconnexion" />
              ),
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

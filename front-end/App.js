import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Home from "./components/Home";
import Favorites from "./components/Favorites"
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Favorites" component = {Favorites}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: ""
  },
});

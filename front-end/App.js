import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Form from "./components/Form";

// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthScreen from './AuthScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Form />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

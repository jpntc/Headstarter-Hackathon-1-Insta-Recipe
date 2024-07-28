import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios"
function Home() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  //Updates state of ingredients array when the "Enter Ingredient" button is pressed
  function handlePress() {
    if (input === "") {
      Alert.alert("Oops!", "Please enter an ingredient");
      return;
    }
    if (ingredients.includes(input)) {
      Alert.alert("Oops!", "You already entered that ingredient!");
      return;
    }
    setIngredients((prevIngredients) => {
      return [...prevIngredients, input];
    });
    setInput("");
  }

  //Updates state of input with each text input
  function handleChange(text) {
    const newText = text;
    setInput(newText);
  }

  //Passes ingredients array to backend when "Generate Recipe" button is pressed
  async function passIngredients() {
    try {

      const response = await axios.post("Backend Route", { ingredients });
      Alert("Success", "Ingredients passed successfully! Generating recipe...");
    } catch (error) {
      Alert.alert("Error", "Failed to send over ingredients!");
      console.error(error);
    }
    setIngredients([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Nav</Text>
        <Text>User Profile</Text>
      </View>
      {/* <Text>
        Ingredients:
        {ingredients.map((ingredient) => {
          return <Text>{ingredient}, </Text>;
        })}
      </Text> */}
      <View style={styles.pane}>
        <View style={styles.resultsPane}></View>
        <View style={styles.inputPane}>
          <TextInput
            //Temporary styling to define text area
            style={{
              width:"80%",
              backgroundColor: "#fff",
              borderRadius: 10,
              borderColor: "gray",
              borderWidth: 1,
              height: 50,
            }}
            placeholder="Enter Ingredients"
            defaultValue={input}
            onChangeText={handleChange}
          ></TextInput>
          <TouchableOpacity
            onPress={handlePress}
            title="Register"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    marginBottom: 10,
  },
  pane: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    paddingBottom: 10,
    margin: 20,
    paddingHorizontal: 20,
  },
  resultsPane: {
    flex: 1,
    padding: 20,
    backgroundColor:"#fff",
    marginVertical: 10,

  },
  inputPane: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent:"center",

    
  },
  button: {
    padding: 2,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#32B001",
  },
});

export default Home;

import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

function Home() {
  const [gptResponse, setGptResponse] = useState("");
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const pfp = require("../assets/images/pfp.png");

  // Updates state of ingredients array when the "Enter Ingredient" button is pressed
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
    passIngredients();
  }

  // Updates state of input with each text input
  function handleChange(text) {
    const newText = text;
    setInput(newText);
  }

  // Passes ingredients array to backend when "Generate Recipe" button is pressed
  async function passIngredients() {
    try {
      const response = await axios.post("http://PUTIPHERE:3000/recipe", {
        ingredients,
      });
      setGptResponse(response.data);
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
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={pfp} style={styles.pfp} />
      </View>
      {menuOpen && (
        <View style={styles.dropdownContent}>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation or action */
            }}
          >
            <Text style={styles.dropdownItem}>Favorite Recipes</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.pane}>
        <ScrollView style={styles.resultsPane}>
          <Text>{gptResponse}</Text>
        </ScrollView>
        <View style={styles.inputPane}>
          <TextInput
            style={styles.input}
            placeholder="Enter Ingredients"
            defaultValue={input}
            onChangeText={handleChange}
          />
          <TouchableOpacity onPress={handlePress} style={styles.button}>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  dropdownContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundSize: "contain",
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

    marginVertical: 10,
  },
  inputPane: {
    width: "100%",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "gray",
    height: 50,
    marginRight: 5,
  },
  button: {
    width: "20",
    padding: 2,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#32B001",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Home;

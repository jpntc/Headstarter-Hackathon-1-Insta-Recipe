import React, { useState } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

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
    <SafeAreaView>
      <Text>
        Ingredients:
        {ingredients.map((ingredient) => {
          return <Text>{ingredient}, </Text>;
        })}
      </Text>
      <TextInput
        //Temporary styling to define text area
        style={{ borderColor: "gray", borderWidth: 1, height: 50 }}
        placeholder="Enter Ingredients"
        defaultValue={input}
        onChangeText={handleChange}
      ></TextInput>
      <Button onPress={handlePress} title="Enter Ingredient" />
      <Button onPress={passIngredients} title="Generate Recipe" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  
})

export default Home;

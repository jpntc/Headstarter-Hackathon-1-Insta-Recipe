import React, { useState } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

function Register() {
  const [user, setUser] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  //Updates state of user after each input. Completed fields are sent to backend if they pass all catch statements in handleRegister().
  function handleChange(key, text) {
    setUser((prevValues) => ({
      ...prevValues,
      [key]: text,
    }));
  }

  async function handleRegister() {
    //Check to make sure email address is valid by comapring email property against a regex pattern to match email addresses
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(user.email) === false) {
      Alert.alert(
        "Invalid Email",
        "Please make sure you have entered a valid email address"
      );
      return;
    }
    //Check to make sure all fields have been filled out. Does not hit the try catch to send to backend if fields empty.
    if (
      user.first === "" ||
      user.last === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      Alert.alert("Fields Empty", "Please complete all fields");
      return;
    }
    try {
      const response = await axios.post("BACKEND ROUTE", user);
      if (response.status === 200) {
        Alert.alert("Success", "Registration Complete");
      } else {
        Alert.alert("Registration Failed", "Please try again");
      }
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Complete Sign Up</Text>
      {/*commented out for production*/}
      {/* <Text>{user.first}</Text>
      <Text>{user.last}</Text>
      <Text>{user.email}</Text>
      <Text>{user.password}</Text> */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          defaultValue={user.first}
          placeholderTextColor="#7B7B7B"
          onChangeText={(text) => handleChange("first", text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          defaultValue={user.last}
          placeholderTextColor="#7B7B7B"
          onChangeText={(text) => handleChange("last", text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7B7B7B"
          onChangeText={(text) => handleChange("email", text)}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7B7B7B"
          onChangeText={(text) => handleChange("password", text)}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={handleRegister} title="Register" style={styles.button}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A5FEA8",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7B7B7B",
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#f5f5dc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "60%",
    alignItems: "center",
    backgroundColor: "#f5f5dc",
    padding: 10,
    borderRadius: 80,
  },
  buttonText: {
    fontSize: 24,
    color: "#7B7B7B",
  },
});

export default Register;

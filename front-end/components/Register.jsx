import React, { useState } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet } from "react-native";
import axios from "axios";

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
    <View>
      <Text>Information</Text>
      <Text>{user.first}</Text>
      <Text>{user.last}</Text>
      <Text>{user.email}</Text>
      <Text>{user.password}</Text>
      <TextInput
        //Temporary styling to define text area
        style={{ borderColor: "gray", borderWidth: 1, height: 50, width: 100 }}
        placeholder="First Name"
        defaultValue={user.first}
        onChangeText={(text) => handleChange("first", text)}
      ></TextInput>
      <TextInput
        //Temporary styling to define text area
        style={{ borderColor: "gray", borderWidth: 1, height: 50, width: 100 }}
        placeholder="Last Name"
        defaultValue={user.last}
        onChangeText={(text) => handleChange("last", text)}
      ></TextInput>
      <TextInput
        //Temporary styling to define text area
        style={{ borderColor: "gray", borderWidth: 1, height: 50, width: 100 }}
        placeholder="Email"
        defaultValue={user.email}
        onChangeText={(text) => handleChange("email", text)}
      ></TextInput>
      <TextInput
        //Temporary styling to define text area
        secureTextEntry={true}
        style={{ borderColor: "gray", borderWidth: 1, height: 50, width: 100 }}
        placeholder="Password"
        defaultValue={user.password}
        onChangeText={(text) => handleChange("password", text)}
      ></TextInput>
      <Button onPress={handleRegister} title="Register" />
    </View>
  );
}

export default Register;

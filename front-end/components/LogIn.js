import React, {useState} from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
// import axios from "axios";


const LogIn = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const background = require("../assets/images/login/background.jpg");

  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("");

  const handleLogIn = ()=>{
    //Updates state of user after each input. Completed fields are sent to backend if they pass all catch statements in handleRegister().
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      Alert.alert(
        "Invalid Email",
        "Please make sure you have entered a valid email address"
      );
      return;
    }
    if (password == "") {
      Alert.alert("No Password", "Please enter your password");
      return;
    }

    const credentials = { email: email, password: password };
    const request = "";
    response = findUser(credentials);
    navigator.navigate("Home");
  }
  const handleRegister = ()=>{
    navigator.navigate("Register");
  }

  async function findUser(){

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.content}
      >
        <View style={styles.banner}>
          <Image
            source={require("../assets/images/logo.jpg")}
            style={styles.logo}
          />
          <Text style={styles.appName}>Insta Recipe</Text>
          <Text style={styles.motto}>Make something from anything</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            onChangeText={(email) => {setEmail(email)}}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            onChangeText={(password) => {setPassword(password)}}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.signUpText}>Or</Text>
            <TouchableOpacity style={styles.signUpButton} onPress ={handleRegister}>
            <Text style={styles.signUpButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width:"80%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 40,
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "Lucida Handwriting",
    color: "#32B001",
    marginTop: 10,
  },
  motto: {
    fontSize: 18,
    color: "#32B001",
    marginTop: 5,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#f5f5dc",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#32B001",
    fontSize: 24,
    fontWeight: "bold",
  },
  signUp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 10,
  },
  signUpText: {
    fontSize: 18,
    color: "#fff",
    marginHorizontal: 4,
  },
  signUpButton: {
    color: "#f5f5dc",
    fontSize: 20,
  },
});

export default LogIn;

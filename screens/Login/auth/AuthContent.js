import { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";

import LoginForm from "./LoginForm";
import { Colors } from "../../../constants/styles";

function AuthContent({message, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  async function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 1;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert(
        "Invalid input",
        "Please check your entered email or password."
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    await onAuthenticate({ email, password });
  }

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/art_prompt_title.png")}
          style={styles.image}
          resizeMethod="contain"
        />
      </View>
      <View style={styles.login}>
        <LoginForm
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 200,
    marginTop: 50,
    marginHorizontal: 40,
  },
  login: {
    marginHorizontal: 32,
    padding: 16,
    backgroundColor: Colors.primary100,
  },
  buttons: {
    marginTop: 8,
  },
  message: {
    textAlign: "center",
    color: Colors.primary500,
    marginTop: 8,
  },
});

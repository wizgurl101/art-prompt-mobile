import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";

import AuthForm from "../auth/AuthForm";
import { Colors } from "../constants/styles";

function LoginScreen({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  function switchAuthModeHandler() {
    // Todo
  }

  function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid || !isLogin) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Art Prompt</Text>
      </View>
      <View style={styles.login}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
      </View>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    marginTop: 64,
    marginHorizontal: 32,
  },
  titleText: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.primary800,
    marginHorizontal: 92,
  },
  login: {
    marginTop: 45,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});

import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/Buttons/IconButton";
import { useContext } from "react";
import { AuthContent } from "../../contexts/auth.context";

function PromptScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Prompt Screen</Text>
      <Text>Authenticated was successfully!</Text>
    </View>
  );
}

export default PromptScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

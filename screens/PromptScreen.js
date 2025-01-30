import { StyleSheet, Text, View } from "react-native";

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

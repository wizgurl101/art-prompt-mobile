import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/Buttons/IconButton";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../contexts/auth.context";

function PromptScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="logout"
          color="white"
          size={24}
          onPress={authCtx.logout}
        />
      ),
    });
  }, [navigation, authCtx]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Art Prompt of the Day</Text>
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

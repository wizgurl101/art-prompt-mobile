import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../../components/Buttons/IconButton";
import { AuthContext } from "../../contexts/auth.context";
import { Colors } from "../../constants/styles";
import { getPrompt } from "../../services/api.service";

function PromptScreen({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="logout"
          color={Colors.primary800}
          size={24}
          onPress={authCtx.logout}
        />
      ),
    });
  }, [navigation, authCtx]);

  useEffect(() => {
    const fetchPrompt = async () => {
      setIsLoading(true);
      try {
        const prompt = await getPrompt(authCtx.token);
        setPrompt(prompt);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPrompt();
  }, [authCtx.token]);

  const drawPrompt = `Draw ${prompt.toLowerCase()}`;

  return (
    <View style={styles.rootContainer}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text style={styles.title}>{drawPrompt}</Text>
      )}
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

import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../../components/Buttons/IconButton";
import { AuthContext } from "../../contexts/auth.context";
import { Colors } from "../../constants/styles";
import { getPrompt } from "../../services/api.service";
import ImageButton from "../../components/Buttons/ImageButton";

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

  const handleOpenCamera = () => {
    console.log("Open camera");
    navigation.navigate("Camera");
  };

  return (
    <>
      <View style={styles.promptContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Text style={styles.title}>{drawPrompt}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <ImageButton
          imageUrl={require("../../assets/camera.png")}
          onPress={handleOpenCamera}
        />
      </View>
    </>
  );
}

export default PromptScreen;

const styles = StyleSheet.create({
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },
});

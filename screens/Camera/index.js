import {useState, useEffect, useRef, useLayoutEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import IconButton from "../../components/Buttons/IconButton";
import {Colors} from "../../constants/styles";

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useCameraPermissions();
  const [cameraFacing, setCameraFacing] = useState("back");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: Colors.primary800
    });
  }, [navigation]);

  if (!hasCameraPermission) {
    return <View />;
  }

  if (!hasCameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={setHasCameraPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setCameraFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <CameraView style={styles.camera} facing={cameraFacing} mode="picture">
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialCommunityIcons name="camera-flip-outline" color="white" size={46} />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

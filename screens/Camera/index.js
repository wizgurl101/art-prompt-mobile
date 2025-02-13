import {useState, useEffect, useRef, useLayoutEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {MaterialCommunityIcons, FontAwesome5} from "@expo/vector-icons";
import {Colors} from "../../constants/styles";
import PhotoPreview from "./PhotoPreview";

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useCameraPermissions();
  const [hasMediaPermission, setHasMediaPermission] = MediaLibrary.usePermissions()
  const [cameraFacing, setCameraFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  let cameraRef = useRef();

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

  if (hasMediaPermission !== 'all') {
    return (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to save photo to your phone
          </Text>
          <Button onPress={setHasMediaPermission} title="grant permission" />
        </View>
    );
  }

  function toggleCameraFacing() {
    setCameraFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    } catch (error) {
      console.error("take picture error", error);
    }
  }

  function deletePhoto() {
    setPhoto(null);
    console.log("deleted photo");
  }

  async function savePhoto() {
    try {
      console.log(JSON.stringify(photo));
      await MediaLibrary.saveToLibraryAsync(photo);
      console.log("saved photo to library");
    } catch (error) {
      console.error("save photo error", error);
    }
    setPhoto(null);
  }

  if(photo !== null) {
    return <PhotoPreview photoUri={photo} onSave={savePhoto} onDelete={deletePhoto} />;
  }

  return (
    <CameraView style={styles.camera} facing={cameraFacing} mode="picture" ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <FontAwesome5 name="dot-circle" color="white" size={60} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialCommunityIcons name="camera-flip-outline" color="white" size={42} />
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

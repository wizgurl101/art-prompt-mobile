import {useState, useRef, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  SafeAreaView,
  Image
} from "react-native";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useCameraPermissions();
  const [cameraFacing, setCameraFacing] = useState("back");
  const [mediaPermissionResponse, mediaRequestPermission] = MediaLibrary.usePermissions()
  const [photo, setPhoto] = useState()
  let cameraRef = useRef(null);

  async function requestMediaLibraryPermission() {
    if(mediaPermissionResponse.status !== "granted") {
      await mediaRequestPermission()
    }
  }

 useEffect(() => {
   (async () => {
     await requestMediaLibraryPermission()
   })()
 }, [])

  // if (!hasCameraPermission.granted) {
  //   return (
  //       <View style={styles.container}>
  //         <Text style={styles.message}>
  //           We need your permission to show the camera
  //         </Text>
  //         <Button onPress={setHasCameraPermission} title="grant permission" />
  //       </View>
  //   );
  // }

  function toggleCameraFacing() {
    setCameraFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
      const options = {
        quality: 2,
        base64: true,
        exif: false
      }

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log(JSON.stringify(newPhoto))
      setPhoto(newPhoto)
  };

  if(photo) {
    const savePhoto = async () => {
      try {
        await MediaLibrary.saveToLibraryAsync(photo.uri)
        setPhoto(undefined)
      } catch (error) {
        Alert.alert("Error", "Unable to save photo")
      }
    }

    return (
        <SafeAreaView>
          <Image style={styles.preview} source={{ uri: photo.uri }} />
          <View style={styles.btnContainer}>
            {mediaRequestPermission === 'granted' ? (
                <TouchableOpacity style={styles.btn} onPress={savePhoto}>
                  <Text>Save</Text>
                </TouchableOpacity>
            ) : undefined}
            <TouchableOpacity
                style={styles.btn}
                onPress={() => setPhoto(undefined)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    )
  }

  return (
      <CameraView
          style={styles.camera}
          facing={cameraFacing}
          mode="picture"
          ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
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
  imageContainer: {
    height: "95%",
    width: "100%",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
    width: "auto",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
});

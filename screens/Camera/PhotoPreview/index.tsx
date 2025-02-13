import {
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PhotoPreview({ photoUri, onSave, onDelete }) {
    return (
        <SafeAreaView style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: photoUri}} />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={onSave}>
                    <MaterialIcons name="save-alt" color="black" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={onDelete}>
                    <MaterialIcons name="delete-outline" color="black" size={24} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    imageContainer: {
        height: "95%",
        width: "100%",
    },
    image: {
        alignSelf: "stretch",
        flex: 1,
        width: "auto",
    },
});

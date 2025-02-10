import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";

export default function ImageButton({ imageUrl, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={imageUrl} style={styles.imageButton} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

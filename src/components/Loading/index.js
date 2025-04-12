import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7F3DFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default Loading;

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Button = ({
  title,
  onPress,
  type = "primary",
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            styles.buttonText,
            type === "primary"
              ? styles.primaryButtonText
              : styles.secondaryButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: "#7F3DFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#7F3DFF",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButtonText: {
    color: "#fff",
  },
  secondaryButtonText: {
    color: "#7F3DFF",
  },
});

export default Button;

import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  multiline = false,
  numberOfLines = 1,
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.multilineInput,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        editable={editable}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default Input;

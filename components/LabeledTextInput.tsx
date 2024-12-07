import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface LabeledTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: object;
  }

  const LabeledTextInput: React.FC<LabeledTextInputProps> = ({ label, value, onChangeText, placeholder, style }) => {
    return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 3,
    borderColor: Colors.dark.background,
    borderRadius: 10,
    padding: 10,
    color: "#333",
  },
});

export default LabeledTextInput;
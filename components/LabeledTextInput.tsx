import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LabeledTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
  secureTextEntry?: boolean; // Nowy props
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false, // Domyślnie wyłączone
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry); // Sterowanie widocznością hasła

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={isSecure} // Ustawienie zasłaniania
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure((prev) => !prev)}
            style={styles.iconContainer}
          >
            <MaterialCommunityIcons
              name={isSecure ? "eye-off" : "eye"} // Zmiana ikony
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.dark.background,
    borderRadius: 10,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#333",
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});

export default LabeledTextInput;

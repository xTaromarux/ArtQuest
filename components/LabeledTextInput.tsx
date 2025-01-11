import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/components/LabeledTextInput.style";
import { LabeledTextInputProps } from "@/utils/types";

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

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
          secureTextEntry={isSecure}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure((prev) => !prev)}
            style={styles.iconContainer}
          >
            <MaterialCommunityIcons
              name={isSecure ? "eye-off" : "eye"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LabeledTextInput;

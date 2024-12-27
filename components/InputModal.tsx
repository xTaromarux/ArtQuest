import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface InputModal {
  isVisible: boolean;
  title: string;
  onConfirm: (label: string) => Promise<void>;
  onCancel: () => void;
  IconComponent: React.ComponentType<any>;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  acceptText?: string;
  labelText?: string;
  error?: { label: string };
  setError: React.Dispatch<React.SetStateAction<{ label: string }>>;
}

const CenteredModal: React.FC<InputModal> = ({
  isVisible,
  title,
  onConfirm,
  onCancel,
  IconComponent,
  iconName,
  iconSize = 50,
  iconColor = "black",
  acceptText,
  labelText,
  error,
  setError,
}) => {
  const [label, setLabel] = useState("");
  const height = Dimensions.get("screen").height;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.screen, { height: height }]}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
      >
        <Modal
          isVisible={isVisible}
          onBackdropPress={onCancel}
          animationIn="zoomIn"
          animationOut="zoomOut"
          backdropOpacity={0.7}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <IconComponent
              style={{ marginTop: 20 }}
              name={iconName}
              size={iconSize}
              color={iconColor}
            />
            <Text style={styles.modalText}>{title}</Text>
            <View style={{ flex: 1, marginTop: 10, width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder={labelText}
                value={label}
                onChangeText={(text) => {
                  setLabel(text);
                  setError({ ...error, label: "" });
                }}
                secureTextEntry
              />
              {error?.label ? (
                <Text style={styles.errorText}>{error.label}</Text>
              ) : (
                <Text style={styles.errorText}> </Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.yesButton]}
                onPress={() => {
                  if (label.trim() === "") {
                    setError({ label: "Please enter the verification code." });
                  } else {
                    onConfirm(label);
                  }
                }}
              >
                <Text style={styles.yesButtonText}>{acceptText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.noButton]}
                onPress={onCancel}
              >
                <Text style={styles.noButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default CenteredModal;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    color: Colors.dark.text,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  noButton: {
    width: "100%",
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  yesButton: {
    width: "100%",
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  yesButtonText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "bold",
  },
  noButtonText: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: "bold",
  },
});

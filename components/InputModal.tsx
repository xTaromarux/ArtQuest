import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InputModal } from "@/utils/types";
import styles from "@/constants/styles/components/CenteredModal.style";

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

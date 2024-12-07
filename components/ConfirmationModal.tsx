import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ConfirmationModal {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  IconComponent: React.ComponentType<any>; 
  iconName: string; 
  iconSize?: number; 
  iconColor?: string;
  acceptText?: string;
}

const CenteredModal: React.FC<ConfirmationModal> = ({
  isVisible,
  title,
  onConfirm,
  onCancel,
  IconComponent,
  iconName,
  iconSize = 50,
  iconColor = "black",
  acceptText
}) => {
  return (
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={onConfirm}
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
  );
};

export default CenteredModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
  },
  button: {
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  noButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  yesButton: {
    width: "100%",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  yesButtonText: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: "bold",
  },
  noButtonText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "bold",
  },
});

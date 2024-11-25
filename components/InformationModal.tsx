import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface InformationModalProps {
  isVisible: boolean;
  title: string;
  onCancel: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({
  isVisible,
  title,
  onCancel,
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
        <MaterialIcons
          name="info-outline"
          style={{ marginTop: 20 }}
          size={50}
          color="black"
        />
        <Text style={styles.modalText}>{title}</Text>
      </View>
    </Modal>
  );
};

export default InformationModal;

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
});

import styles from "@/constants/styles/components/CenteredModal.styles";
import { ConfirmationModal } from "@/utils/types";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const CenteredModal: React.FC<ConfirmationModal> = ({
  isVisible,
  title,
  onConfirm,
  onCancel,
  IconComponent,
  iconName,
  iconSize = 50,
  iconColor = "black",
  acceptText,
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

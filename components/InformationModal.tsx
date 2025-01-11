import React from "react";
import { View, Text} from "react-native";
import Modal from "react-native-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { InformationModalProps } from "@/utils/types";
import styles from "@/constants/styles/components/InformationModal.style";

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
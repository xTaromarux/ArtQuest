import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";
import styles from "@/constants/styles/components/Template2.style";

const Template2 = ({
  exercise,
  handlePress,
}: {
  exercise: Exercise;
  handlePress: () => void;
}) => {
  const { short_descriptions, descriptions, picture_urls } = exercise;
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInfoPress = (index: number) => {
    setModalTitle(descriptions[index] || "No description available");
    toggleModal();
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* Pierwszy wiersz */}
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {short_descriptions[0]}
            </Text>
          </View>
        </View>

        {/* Drugi wiersz */}
        <View style={[styles.row, { flex: 0.5 }]}>
          <Pressable
            onPress={() => handleInfoPress(1)}
            style={[
              styles.textContainer,
              { position: "absolute", right: 0, top: 0, width: "70%" },
            ]}
          >
            <Text style={styles.text}>{short_descriptions[1]}</Text>
            <View style={styles.iconContainer}>
              <Feather name="info" size={20} color="black" />
            </View>
          </Pressable>
        </View>

        {/* Trzeci wiersz */}
        <View style={[styles.row, { flex: 1.5 }]}>
          <CustomImage
            url={picture_urls[0].url}
            style={[styles.image, { width: 300, height: 300 }]}
          />
        </View>

        {/* Czwarty wiersz */}
        <View style={[styles.row, { flex: 0.5 }]}>
          <Pressable
            onPress={() => handleInfoPress(2)}
            style={[styles.textContainer, { width: "100%" }]}
          >
            <Text style={styles.text}>{short_descriptions[2]}</Text>
            <View style={styles.iconContainer}>
              <Feather name="info" size={20} color="black" />
            </View>
          </Pressable>
        </View>

        {/* Piąty wiersz */}
        <View style={[styles.row, { flex: 1 }]}>
          <CustomImage
            url={picture_urls[1].url}
            style={[styles.image, { width: 300, height: 150 }]}
          />
        </View>

        {/* Szósty wiersz */}
        <View style={[styles.row, { flex: 0.5 }]}>
          <Pressable
            onPress={() => handleInfoPress(3)}
            style={[styles.textContainer, { width: "100%" }]}
          >
            <Text style={styles.text}>{short_descriptions[3]}</Text>
            <View style={styles.iconContainer}>
              <Feather name="info" size={20} color="black" />
            </View>
          </Pressable>
        </View>
      </View>
      <InformationModal
        isVisible={isModalVisible}
        title={modalTitle}
        onCancel={toggleModal}
      />
    </GestureHandlerRootView>
  );
};

export default Template2;

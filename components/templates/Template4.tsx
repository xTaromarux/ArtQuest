import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import InformationModal from "../InformationModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "@/constants/styles/components/Template4.style";

const Template4 = ({
  exercise,
  handlePress,
}: {
  exercise: Exercise;
  handlePress: () => Promise<void>;
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
        {descriptions[0] && (
          <View style={[styles.row]}>
            <Pressable
              onPress={() => handleInfoPress(0)}
              style={[styles.textContainer, { width: "100%" }]}
            >
              <Text style={styles.text}>{short_descriptions[0]}</Text>
              <View style={styles.iconContainer}>
                <Feather name="info" size={20} color="black" />
              </View>
            </Pressable>
          </View>
        )}

        {/* Drugi wiersz z dwiema kolumnami */}
        {picture_urls[0] && (
          <View
            style={[
              styles.row,
              {
                flex: 2,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              },
            ]}
          >
            <CustomImage
              url={picture_urls[0].url}
              style={[styles.image, { width: 200, height: 200 }]}
            />
          </View>
        )}

        {/* Trzeci wiersz z dwiema kolumnami */}
        {picture_urls[1] && (
          <View
            style={[
              styles.row,
              { flex: 2, alignItems: "flex-start", justifyContent: "flex-end" },
            ]}
          >
            <CustomImage
              url={picture_urls[1].url}
              style={[styles.image, { width: 200, height: 200 }]}
            />
          </View>
        )}

        {/* Czwarty wiersz z dwiema kolumnami */}
        {descriptions[1] && (
          <View style={[styles.row]}>
            <Pressable
              onPress={() => handleInfoPress(1)}
              style={[styles.textContainer, { width: "100%" }]}
            >
              <Text style={styles.text}>{short_descriptions[1]}</Text>
              <View style={styles.iconContainer}>
                <Feather name="info" size={20} color="black" />
              </View>
            </Pressable>
          </View>
        )}
      </View>
      <InformationModal
        isVisible={isModalVisible}
        title={modalTitle}
        onCancel={toggleModal}
      />
    </GestureHandlerRootView>
  );
};


export default Template4;

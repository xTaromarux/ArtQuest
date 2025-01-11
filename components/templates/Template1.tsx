import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";
import styles from "@/constants/styles/components/Template1.style";

const Template1 = ({
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

        {/* Drugi wiersz z dwiema kolumnami */}
        <View style={[styles.row, styles.rowSplit]}>
          <Image source={{ uri: picture_urls[0].url }} style={styles.image} />
          <Pressable
            style={[
              styles.textContainer,
              { position: "absolute", right: 0, top: 0, width: "70%" },
            ]}
            onPress={() => handleInfoPress(1)}
          >
            <Text style={styles.text}>{short_descriptions[1]}</Text>
            <View style={styles.iconContainer}>
              <Feather name="info" size={20} color="black" />
            </View>
          </Pressable>
        </View>

        {/* Trzeci wiersz z dwiema kolumnami */}
        <View style={[styles.row, styles.rowSplit]}>
          <CustomImage url={picture_urls[1].url} style={styles.image} />
          <CustomImage url={picture_urls[2].url} style={styles.image} />
        </View>

        {/* Czwarty wiersz z dwiema kolumnami */}
        <View style={[styles.row, styles.rowSplit]}>
          <CustomImage url={picture_urls[3].url} style={styles.image} />
          <CustomImage url={picture_urls[4].url} style={styles.image} />
        </View>

        {/* Piąty wiersz */}
        <View style={styles.row}>
          <Pressable
            onPress={() => handleInfoPress(2)}
            style={[styles.textContainer, { width: "70%" }]}
          >
            <Text style={styles.text}>{short_descriptions[2]}</Text>
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

export default Template1;

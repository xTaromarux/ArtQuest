import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";

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
    console.log("XDDDDDDDDDDDDD");

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  rowSplit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    width: "100%",
    fontWeight: "bold",
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    width: "40%",
    height: "80%",
    resizeMode: "contain",
    margin: 10,
  },
});

export default Template1;

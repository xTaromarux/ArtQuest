import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import InformationModal from "../InformationModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
              onPress={() => console.log("Info pressed")}
              style={[styles.textContainer, { width: "100%" }]}
            >
              <Text style={styles.text}>{descriptions[0]}</Text>
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
              onPress={() => console.log("Info pressed")}
              style={[styles.textContainer, { width: "100%" }]}
            >
              <Text style={styles.text}>{descriptions[1]}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1, // Wypełnia równą część wysokości
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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

export default Template4;

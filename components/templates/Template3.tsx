import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";

const Template3 = ({
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
        {short_descriptions[0] && (
          <View style={[styles.row, { flex: 0.8 }]}>
            <View style={styles.textContainer}>
              <Text style={[styles.text, { fontSize: 20 }]}>
                {short_descriptions[0]}
              </Text>
            </View>
          </View>
        )}

        {/* Drugi wiersz */}
        {short_descriptions[1] && (
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
        )}

        {/* Trzeci wiersz */}
        {picture_urls[0] && (
          <View style={[styles.row, { flex: 2, alignItems: "flex-start" }]}>
            <CustomImage
              url={picture_urls[0].url}
              style={[styles.image, { width: 350, height: 250 }]}
            />
          </View>
        )}

        {/* Czwarty wiersz */}
        {short_descriptions[2] && (
          <View style={[styles.row, { flex: 0.5 }]}>
            <Pressable
              onPress={() => handleInfoPress(2)}
              style={[styles.textContainer, { width: "100%"}]}
            >
              <Text style={styles.text}>{short_descriptions[2]}</Text>
              <Pressable
                onPress={() => handleInfoPress(2)}
                style={[styles.iconContainer]}
              >
                <Feather name="info" size={20} color="black" />
              </Pressable>
            </Pressable>
          </View>
        )}

        {/* Piąty wiersz */}
        <View style={[styles.row, { flex: 0.5 }]}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonTextDark}>Make picture</Text>
            <Feather
              name="camera"
              size={22}
              color={Colors.dark.tintDarkerGreen}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
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
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "center",
    height: 50,
  },
  buttonTextDark: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Template3;

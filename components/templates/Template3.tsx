import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";
import styles from "@/constants/styles/components/Template3.style";

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
              style={[styles.textContainer, { width: "100%" }]}
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

export default Template3;

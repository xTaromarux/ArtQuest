import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { Exercise } from "@/utils/types";
import CustomImage from "../CustomImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InformationModal from "../InformationModal";
import styles from "@/constants/styles/components/TemplateEnd.styles";

const TemplateEnd = ({
  exercise,
  handlePress,
}: {
  exercise: Exercise;
  handlePress?: () => void;
}) => {  
  const { short_descriptions, descriptions, picture_urls, percentage } = exercise;
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
        {picture_urls[0] && (
          <View style={[styles.row, { flex: 2 }]}>
            <CustomImage
              url={picture_urls[0].url}
              style={[styles.image, { width: "90%", height: "90%" }]}
            />
          </View>
        )}

        {/* Drugi wiersz */}
        <View style={[styles.row, { flex: 0.6, flexDirection: "column" }]}>
          {descriptions[0] && (
            <View style={styles.textContainer}>
              <Text style={[styles.text, { fontSize: 28, paddingBottom: 10 }]}>
                {descriptions[0]}
              </Text>
            </View>
          )}
          {descriptions[1] && (
            <View style={styles.textContainer}>
              <Text style={[styles.text, { fontWeight: "400" }]}>
                {descriptions[1]}
              </Text>
            </View>
          )}
        </View>

        {/* Trzeci wiersz */}
        <View style={[styles.row, styles.rowSplit, { flex: 1 }]}>
          <View
            style={[
              styles.miniContainer,
              { backgroundColor: Colors.dark.tintDarkGreen },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: Colors.light.background, fontWeight: "500" },
              ]}
            >
              Completion %
            </Text>
            <View style={[styles.innerContainer]}>
              <MaterialCommunityIcons
                name="progress-star"
                size={24}
                color="black"
              />
              <Text style={[styles.smallText]}>
                {(percentage * 10).toFixed(0)}%
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.miniContainer,
              { backgroundColor: Colors.dark.tintDarkerGreen },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: Colors.light.background, fontWeight: "500" },
              ]}
            >
              Points
            </Text>
            <View style={[styles.innerContainer]}>
              <Feather name="target" size={24} color="black" />
              <Text style={[styles.smallText]}>100</Text>
            </View>
          </View>
        </View>

        {/* Czwarty wiersz */}
        <View style={[styles.row, { flex: 0.5 }]}>
          {handlePress && (
            <Text style={[styles.text, { fontSize: 16 }]} onPress={handlePress}>
              Tap here to continue
            </Text>
          )}
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

export default TemplateEnd;

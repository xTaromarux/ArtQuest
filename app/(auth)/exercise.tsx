import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@/components/ProgressBar";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/screens/ExerciseScreen.styles";
import { Link } from "expo-router";
import PathItem from "@/components/PathItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const ExerciseScreen: React.FC = () => {
  const pathItems = [
    { id: "1", label: "Lorem ipsum", icon: "star" as IconName, position: 2 },
    { id: "2", label: "Lorem ipsum", icon: "play" as IconName, position: 4 },
    { id: "3", label: "Lorem ipsum", icon: "play" as IconName, position: 8 },
    { id: "4", label: "Lorem ipsum", icon: "play" as IconName, position: 12 },
  ];
  const height = Dimensions.get("screen").height;
  const grid = Array(12)
    .fill(null)
    .map((_, index) => {
      const item = pathItems.find((i) => i.position === index + 1);
      return item ? (
        <View key={`item-${item.id}`} style={styles.pathItemWrapper}>
          <PathItem icon={item.icon} title={item.label} />
        </View>
      ) : (
        <View key={`empty-${index}`} style={styles.emptyCell} />
      );
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { height }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        {/* Course Card at the Top */}
        <View style={styles.courseCard}>
          <View style={styles.courseInfoContainer}>
            <Text style={styles.courseTitle}>Lorem ipsum</Text>
            <Text style={styles.courseSubtitle}>Lorem ipsum • Level 1</Text>
            <ProgressBar progress={0.6} color={Colors.dark.tintLighterGreen} />
          </View>
          <Link href="/home" asChild>
            <View style={styles.infoIconContainer}>
              <MaterialCommunityIcons name="book" size={24} color="black" />
            </View>
          </Link>
        </View>
        <ImageBackground
          source={require("@/assets/images/background_pattern.png")}
          style={[styles.fullPathContainer]}
        >
          <View style={styles.gridContainer}>{grid}</View>
        </ImageBackground>
        <View style={{ height: 90, width: "100%" }} />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;

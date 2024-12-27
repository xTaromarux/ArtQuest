import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ProgressBar from "@/components/ProgressBar";
import Colors from "@/constants/Colors";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/screens/ExerciseScreen.styles";
import { Link, useGlobalSearchParams } from "expo-router";
import PathItem from "@/components/PathItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import stylesModal from "@/constants/styles/components/Modal.style";
import { Course } from "@/utils/types";
import { Portal } from "@gorhom/portal";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const ExerciseScreen: React.FC = () => {
  const { id, exercise } = useGlobalSearchParams();
  
  let courseDetails = {
    id: "1",
    label: "Lines",
    shortDesc: "Foundation of all drawing and art",
    level: 1,
    percentage: 0.2,
    color: "#FF6B6B",
  };
  
  if (typeof exercise === "string") {
    try {
      courseDetails = JSON.parse(exercise);
    } catch (error) {
      console.error("Nie udało się sparsować danych:", error);
    }
  }

  const view = [
    {
      id: "1",
      template: 1,
      next_view_id: "2",
      previous_view_id: null,
      ai_part: false,
      percentage: 0.2,
      description: [
        "Lines: The Foundation of Art",
        "Discover how simple shapes like circles",
        "Master the basics of line work to bring your art to life.",
      ],
      picture: [
        require("@/assets/images/LessonNo1_No1.png"),
        require("@/assets/images/LessonNo1_No2.png"),
        require("@/assets/images/LessonNo1_No3.png"),
        require("@/assets/images/LessonNo1_No4.png"),
        require("@/assets/images/LessonNo1_No5.png"),
      ],
    },
  ];

  const pathItems = [
    { id: "1", label: "The First Stroke", icon: "star" as IconName, position: 2 },
    { id: "2", label: "Curves and Arcs", icon: "play" as IconName, position: 4 },
    { id: "3", label: "Shapes from Lines", icon: "play" as IconName, position: 8 },
    { id: "4", label: "Exercise", icon: "play" as IconName, position: 12 },
  ];

  const course = {
    id: "1",
    title: "Lines",
    short_desscription: "Lorem ipsum dolor sit amet",
    description:
      "Lines are the foundation of all drawing and art. They are the simplest, yet most essential elements of any composition, forming the basis of everything we see and create. Whether it's the outline of a shape, the curve of a landscape, or the intricate details of a portrait, everything begins with a line. In this lesson, you'll learn the basics of how to draw lines with precision and confidence. By practicing straight lines, curves, and angles, you'll start to understand how they work together to create structure and form. You'll also discover how lines can represent movement, energy, and even emotions, depending on their length, thickness, and direction.",
      long_description:
      "Through simple exercises, you'll develop control over your hand movements, allowing you to draw steady lines with ease. This skill is crucial, as mastering the ability to draw clean lines is the first step toward creating more complex drawings. You'll also explore how lines can define space, give a sense of depth, and create patterns, helping you see how they come together to build a complete composition. This lesson is perfect for beginners, offering a clear and easy way to start your artistic journey. By the end, you'll have the confidence to use lines as a tool to bring your ideas to life, knowing that every masterpiece begins with a single, simple stroke.",
    icon: require("@/assets/images/lines.png"),
    color: "#FF6B6B",
  };



  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 170;
  const modalizeRef = useRef<Modalize>(null); // <- Problem
  const grid = Array(12)
    .fill(null)
    .map((_, index) => {
      const item = pathItems.find((i) => i.position === index + 1);
      return item ? (
        <View key={`item-${item.id}`} style={styles.pathItemWrapper}>
          <PathItem icon={item.icon} title={item.label} exercise={view[0]} />
        </View>
      ) : (
        <View key={`empty-${index}`} style={styles.emptyCell} />
      );
    });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const onOpen = (course: Course) => {
    // Directly pass the course object, avoiding any reference to the synthetic event
    setSelectedCourse(course);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
    setSelectedCourse(null);
  };

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
          <View style={styles.barContainer}>
            <View
              style={[styles.bar, { backgroundColor: courseDetails.color }]}
            ></View>
          </View>
          <View style={styles.courseInfoContainer}>
            <Text style={styles.courseTitle}>{courseDetails.label}</Text>
            <Text style={styles.courseSubtitle}>
              {courseDetails.shortDesc} • Level {courseDetails.level}
            </Text>
            <ProgressBar
              progress={courseDetails.percentage}
              color={Colors.dark.tintLighterGreen}
            />
          </View>
          <View style={styles.infoIconContainer}>
            <Pressable
              style={[styles.infoIcon, { borderColor: course.color }]}
              onPress={() => onOpen(course)}
            >
              <AntDesign name="book" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <ImageBackground
          source={require("@/assets/images/background_pattern.png")}
          style={[styles.fullPathContainer]}
        >
          <View style={styles.gridContainer}>{grid}</View>
        </ImageBackground>
        <View style={{ height: 90, width: "100%" }} />

        <Portal>
          <Modalize
            modalHeight={MODAL_HEIGHT}
            snapPoint={MODAL_HEIGHT}
            velocity={0.8}
            dragToss={0.1}
            ref={modalizeRef}
            HeaderComponent={
              <View style={stylesModal.modalHeader}>
                <Pressable onPress={onClose}>
                  <Feather name="x" size={24} color="black" />
                </Pressable>
              </View>
            }
          >
            <View style={stylesModal.modalContent}>
              {selectedCourse && (
                <>
                  <View style={stylesModal.iconModalContainer}>
                    <Image
                      source={require("@/assets/images/lines.png")}
                      style={stylesModal.modalIcon}
                    />
                  </View>
                  <View style={stylesModal.titleModalContainer}>
                    <Text style={stylesModal.modalTitle}>
                      {selectedCourse.title}
                    </Text>
                  </View>
                  <View style={stylesModal.textModalContainer}>
                    <Text style={[stylesModal.modalText, { marginBottom: 20 }]}>
                      {selectedCourse.description}
                    </Text>
                    <Text style={stylesModal.modalText}>
                      {selectedCourse.long_description}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </Modalize>
        </Portal>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;

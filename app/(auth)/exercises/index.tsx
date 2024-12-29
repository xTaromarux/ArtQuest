import React, { useEffect, useRef, useState } from "react";
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
import { Course, CourseRequest } from "@/utils/types";
import { Portal } from "@gorhom/portal";
import API_BASE_URL from "@/utils/config";
import useFetchCourseDetails from "@/hooks/useFetchCourseDetails";
import useFetchUserId from "@/hooks/useFetchUserId";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const ExerciseScreen: React.FC = () => {
  const { id, newCourse } = useGlobalSearchParams();
  const { userId, loading: userLoading, error: userError } = useFetchUserId();
  const { course, loading, error } = useFetchCourseDetails(userId);
  
  // if (typeof newCourse === "string") {
  //   try {
  //     course = JSON.parse(newCourse);
  //   } catch (error) {
  //     console.error("Nie udało się sparsować danych:", error);
  //   }
  // }

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
    {
      id: "1",
      label: "The First Stroke",
      icon: "star" as IconName,
      position: 2,
    },
    {
      id: "2",
      label: "Curves and Arcs",
      icon: "play" as IconName,
      position: 4,
    },
    {
      id: "3",
      label: "Shapes from Lines",
      icon: "play" as IconName,
      position: 8,
    },
    { id: "4", label: "Exercise", icon: "play" as IconName, position: 12 },
  ];


  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 170;
  const modalizeRef = useRef<Modalize>(null); // <- Problem
  const grid = Array(12)
    .fill(null)
    .map((_, index) => {
      const item = pathItems.find((i) => i.position === index + 1);
      return item ? (
        <View key={`item-${item.id}`} style={styles.pathItemWrapper}>
          <PathItem icon="play" title={item.label} exercise={view[0]} />
        </View>
      ) : (
        <View key={`empty-${index}`} style={styles.emptyCell} />
      );
    });

  const [selectedCourse, setSelectedCourse] = useState<CourseRequest | null>(null);

  const onOpen = (course: CourseRequest) => {
    // Directly pass the course object, avoiding any reference to the synthetic event
    setSelectedCourse(course);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
    setSelectedCourse(null);
  };

  if (userLoading || loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (userError || error) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Error: {userError || error}</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>No course found</Text>
      </View>
    );
  }

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
              style={[styles.bar, { backgroundColor: course.difficulty.color }]}
            ></View>
          </View>
          <View style={styles.courseInfoContainer}>
            <Text style={styles.courseTitle}>{course.course.title}</Text>
            <Text style={styles.courseSubtitle}>
              {course.course.short_desscription} • Level {course.difficulty.level}
            </Text>
            <ProgressBar progress={course.stage || 0} color={Colors.dark.tintLighterGreen} />
          </View>
          <View style={styles.infoIconContainer}>
            <Pressable
              style={[styles.infoIcon, { borderColor: course.difficulty.color }]}
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
                      {selectedCourse.course.title}
                    </Text>
                  </View>
                  <View style={stylesModal.textModalContainer}>
                    <Text style={[stylesModal.modalText, { marginBottom: 20 }]}>
                      {selectedCourse.course.description}
                    </Text>
                    <Text style={stylesModal.modalText}>
                      {selectedCourse.course.long_description}
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

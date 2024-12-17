import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchBar from "@/components/SearchBar";
import Line from "@/components/Line";
import styles from "@/constants/styles/screens/CoursesScreen.styles";
import stylesModal from "@/constants/styles/components/Modal.style";
import { Portal } from "@gorhom/portal";
import Feather from "@expo/vector-icons/Feather";
import { Course } from "@/utils/types";
import ConfirmationModal from "@/components/ConfirmationModal";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const courses = [
  {
    id: "1",
    title: "Lines",
    description: "Master the art of drawing lines.",
    descriptionLongNo1:
      "Lines are the foundation of all drawing and art. They are the simplest, yet most essential elements of any composition, forming the basis of everything we see and create. Whether it's the outline of a shape, the curve of a landscape, or the intricate details of a portrait, everything begins with a line. In this lesson, you'll learn the basics of how to draw lines with precision and confidence. By practicing straight lines, curves, and angles, you'll start to understand how they work together to create structure and form. You'll also discover how lines can represent movement, energy, and even emotions, depending on their length, thickness, and direction.",
    descriptionLongNo2:
      "Through simple exercises, you'll develop control over your hand movements, allowing you to draw steady lines with ease. This skill is crucial, as mastering the ability to draw clean lines is the first step toward creating more complex drawings. You'll also explore how lines can define space, give a sense of depth, and create patterns, helping you see how they come together to build a complete composition. This lesson is perfect for beginners, offering a clear and easy way to start your artistic journey. By the end, you'll have the confidence to use lines as a tool to bring your ideas to life, knowing that every masterpiece begins with a single, simple stroke.",
    icon: require("@/assets/images/lines.png"),
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Basic Shapes",
    description: "Build with simple shapes.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/shapes.png"),
    color: "#845EC2",
  },
  {
    id: "3",
    title: "3D Vision",
    description: "Add depth to your drawings.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/vision.png"),
    color: "#4B9FDE",
  },
  {
    id: "4",
    title: "Light and Shading",
    description: "Bring art to life with light.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/shading.png"),
    color: "#00C9A7",
  },
  {
    id: "5",
    title: "Perspective",
    description: "Create depth and space.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/perspective.png"),
    color: "#FFD93D",
  },
  {
    id: "6",
    title: "Basic Anatomy",
    description: "Draw lifelike figures.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
  {
    id: "7",
    title: "Basic Anatomy",
    description: "Draw lifelike figures.",
    descriptionLongNo1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
];

const exerciseDetails = {
  id: "7",
  label: "Basic Anatomy",
  shortDesc: "Draw lifelike figures.",
  level: 4,
  percentage: 0.2,
  color: "#FF914D",
};

const CourseListScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null); // <- Problem
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 170;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleAccept = () => {
    setModalVisible(false);
    router.push({
      pathname: `../exercises`,
      params: {
        id: "2",
        exercise: JSON.stringify(exerciseDetails),
      },
    });
  };

  const renderCourseItem = ({ item }: { item: Course }) => (
    <Pressable
      style={styles.courseCard}
      onPress={handleOpen}
    >
        <View style={[styles.iconContainer]}>
          <View style={[styles.iconBar, { backgroundColor: item.color }]} />
          <Image source={item.icon} style={styles.icon} />
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseDescription}>{item.description}</Text>
        </View>
        <Pressable
          style={[styles.infoIconContainer, { borderColor: item.color }]}
          onPress={() => onOpen(item)} // Pass `item` directly, without any synthetic event
        >
          <AntDesign name="book" size={24} color="black" />
        </Pressable>
    </Pressable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { height }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        <Text style={styles.header}>Browse all courses</Text>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginHorizontal: 20 }}
        />

        <View style={{ paddingHorizontal: 20 }}>
          <Line width={100} style={{ marginVertical: 10 }} />
        </View>

        <Text style={styles.sectionTitle}>Basic path</Text>
        <FlatList
          data={filteredCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={{ height: 60 }} />

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
                      source={selectedCourse.icon}
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
                      {selectedCourse.descriptionLongNo1}
                    </Text>
                    <Text style={stylesModal.modalText}>
                      {selectedCourse.descriptionLongNo2}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </Modalize>
        </Portal>
      </KeyboardAvoidingView>
      <ConfirmationModal
        isVisible={modalVisible}
        onConfirm={handleAccept}
        onCancel={handleCancel}
        title="Are you sure you want to change you exercise?"
        IconComponent={AntDesign}
        iconName="exclamationcircleo"
        iconSize={40}
        iconColor={Colors.dark.background}
        acceptText="Change"
      />
    </GestureHandlerRootView>
  );
};

export default CourseListScreen;

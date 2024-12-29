import React, { useRef, useState, useEffect } from "react";
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
import { Course, CourseRequest } from "@/utils/types";
import ConfirmationModal from "@/components/ConfirmationModal";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import API_BASE_URL from "@/utils/config";
import CustomImage from "@/components/CustomImage";

const CourseListScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 170;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseRequest | null>(
    null
  );
  const [courses, setCourses] = useState<CourseRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/all_courses_details`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const onOpen = (course: CourseRequest) => {
    setSelectedCourse(course);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.course.title &&
      course.course.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        // id: "2",
        // exercise: JSON.stringify(exerciseDetails),
      },
    });
  };

  const renderCourseItem = ({ item }: { item: CourseRequest }) => (
    <Pressable style={styles.courseCard} onPress={() => handleOpen()}>
      <View style={[styles.iconContainer]}>
        <View
          style={[styles.iconBar, { backgroundColor: item.difficulty.color }]}
        />
        {/* <Image source={{ uri: item.picture_url }} style={styles.icon} /> */}
        <CustomImage url={item.picture_url} style={styles.icon} />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.course.title}</Text>
        <Text style={styles.courseDescription}>
          {item.course.short_desscription}
        </Text>
      </View>
      <Pressable
        style={[
          styles.infoIconContainer,
          { borderColor: item.difficulty.color },
        ]}
        onPress={() => onOpen(item)}
      >
        <AntDesign name="book" size={24} color="black" />
      </Pressable>
    </Pressable>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading courses...</Text>
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
          keyExtractor={(item) => item.course.id}
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
                    {/* <Image
                      source={{ uri: selectedCourse.picture_url }}
                      style={stylesModal.modalIcon}
                    /> */}
                    <CustomImage
                      url={selectedCourse.picture_url}
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

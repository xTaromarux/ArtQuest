import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Modalize } from "react-native-modalize";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchBar from "@/components/SearchBar";
import Line from "@/components/Line";
import styles from "@/constants/styles/screens/CoursesScreen.styles";
import { Portal } from "@gorhom/portal";
import Feather from "@expo/vector-icons/Feather";

const courses = [
  {
    id: "1",
    title: "Lines",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/lines.png"),
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Basic Shapes",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/shapes.png"),
    color: "#845EC2",
  },
  {
    id: "3",
    title: "3D Vision",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/vision.png"),
    color: "#4B9FDE",
  },
  {
    id: "4",
    title: "Light and Shading",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/shading.png"),
    color: "#00C9A7",
  },
  {
    id: "5",
    title: "Perspective",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/perspective.png"),
    color: "#FFD93D",
  },
  {
    id: "6",
    title: "Basic Anatomy",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
  {
    id: "7",
    title: "Basic Anatomy",
    description: "Lorem ipsum dolor sit amet",
    descriptionLongNo1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    descriptionLongNo2: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
];

const CourseListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const modalizeRef = useRef<Modalize>(null); // Przeniesienie useRef tutaj
  const { height } = useWindowDimensions();
  const MODAL_HEIGHT = height - 170;
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[0] | null
  >(null);

  const onOpen = (course: (typeof courses)[0]) => {
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

  const renderCourseItem = ({ item }: { item: (typeof courses)[0] }) => (
    <View style={styles.courseCard}>
      <View style={[styles.iconContainer]}>
        <View style={[styles.iconBar, { backgroundColor: item.color }]}></View>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </View>
      <Pressable
        style={[styles.infoIconContainer, { borderColor: item.color }]}
        onPress={() => onOpen(item)}
      >
        <AntDesign name="book" size={24} color="black" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
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
      <View style={{ height: 60 }}></View>
      <Portal>
        <Modalize
          modalHeight={MODAL_HEIGHT}
          snapPoint={MODAL_HEIGHT}
          velocity={0.8}
          dragToss={0.1}
          ref={modalizeRef}
          HeaderComponent={
            <View style={styles.modalHeader}>
              <Pressable onPress={onClose}>
                <Feather name="x" size={24} color="black" />
              </Pressable>
            </View>
          }
        >
          <View style={styles.modalContent}>
            {selectedCourse && (
              <>
                <View style={styles.iconModalContainer}>
                  <Image
                    source={selectedCourse.icon}
                    style={styles.modalIcon}
                  />
                </View>
                <View style={styles.titleModalContainer}>
                  <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                </View>
                <View style={styles.textModalContainer}>
                  <Text style={[styles.modalText, {marginBottom: 20}]}>{selectedCourse.descriptionLongNo1}</Text>
                  <Text style={styles.modalText}>{selectedCourse.descriptionLongNo2}</Text>
                </View>
              </>
            )}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default CourseListScreen;

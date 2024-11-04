import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchBar from "@/components/SearchBar"; // Importujemy komponent SearchBar
import Line from "@/components/Line";

const courses = [
  {
    id: "1",
    title: "Lines",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/lines.png"),
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Basic Shapes",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/shapes.png"),
    color: "#845EC2",
  },
  {
    id: "3",
    title: "3D Vision",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/vision.png"),
    color: "#4B9FDE",
  },
  {
    id: "4",
    title: "Light and Shading",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/shading.png"),
    color: "#00C9A7",
  },
  {
    id: "5",
    title: "Perspective",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/perspective.png"),
    color: "#FFD93D",
  },
  {
    id: "6",
    title: "Basic Anatomy",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
  {
    id: "7",
    title: "Basic Anatomy",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
  {
    id: "8",
    title: "Basic Anatomy",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/anatomy.png"),
    color: "#FF914D",
  },
];

const CourseListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrowanie kursów na podstawie zapytania
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
      <View style={[styles.infoIconContainer, { borderColor: item.color }]}>
        <AntDesign name="book" size={24} color="black" />{" "}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Browse all courses</Text>

      {/* Pasek wyszukiwania */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <Line width={100} style={{ marginVertical: 20 }} />

      {/* Tytuł sekcji */}
      <Text style={styles.sectionTitle}>Basic path</Text>

      {/* Lista kursów */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CourseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 85,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.dark.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconBar: {
    width: 5,
    borderRadius: 10,
    height: "100%",
  },
  icon: {
    width: 50,
    height: 50,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
  },
  infoIconContainer:{
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  }
});

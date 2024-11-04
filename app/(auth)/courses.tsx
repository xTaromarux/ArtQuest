import React from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const courses = [
  {
    id: "1",
    title: "Lines",
    description: "Lorem ipsum dolor sit amet",
    icon: require("@/assets/images/lines.png"), // Zastąp odpowiednim plikiem obrazu
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
  const renderCourseItem = ({ item }: { item: typeof courses[0] }) => (
    <View style={styles.courseCard}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </View>
      {/* <Ionicons name="md-arrow-forward" size={24} color="#333" /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Browse all courses</Text>
      
      {/* Pasek wyszukiwania */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        {/* <Ionicons name="md-search" size={20} color="#333" style={styles.searchIcon} /> */}
      </View>

      <View style={styles.divider} />

      {/* Tytuł sekcji */}
      <Text style={styles.sectionTitle}>Basic path</Text>

      {/* Lista kursów */}
      <FlatList
        data={courses}
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
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    width: 30,
    height: 30,
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
});

import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.dark.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
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
    marginRight: 10
  },
  icon: {
    width: 55,
    height: 55,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  courseDescription: {
    fontSize: 16,
    color: "#666",
  },
  infoIconContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
});

export default styles;
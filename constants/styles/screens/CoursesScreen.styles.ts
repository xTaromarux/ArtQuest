import { StyleSheet } from "react-native";
import Colors from "../../Colors";

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

export default styles;

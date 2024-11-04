import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 60,
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
    marginRight: 10
  },
  icon: {
    width: 45,
    height: 45,
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
  infoIconContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalContent: {
    padding: 16,
  },
  iconModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalIcon: {
    width: 150,
    height: 150,
  },
  titleModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20, 
    marginVertical: 10
  },
  modalText:{
    fontSize: 15,
  }
});

export default styles;

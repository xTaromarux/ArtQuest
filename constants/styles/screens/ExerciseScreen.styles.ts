import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  fullPathContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingBottom:20,
    paddingTop: 40,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    width: "100%",
  },
  courseInfoContainer: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  courseSubtitle: {
    fontSize: 12,
    color: Colors.dark.text,
    marginVertical: 5,
  },
  infoIconContainer: {
    borderColor: "#845EC2",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  pathItemWrapper: {
    width: "33.33%", // 3 columns
    alignItems: "flex-start",
    paddingLeft: 20,
    marginVertical: 10,
  },
  emptyCell: {
    width: "33.33%", // 3 columns
    height: 100, // height to match PathItem components
  },
  pathContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pathItem: {
    alignItems: "center",
    marginBottom: 30,
  },
  pathIcon: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 50,
  },
  pathLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
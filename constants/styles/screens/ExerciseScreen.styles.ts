import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

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
    paddingHorizontal: 15,
    paddingBottom:10,
    paddingTop: 40,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    width: "100%",
  },
  barContainer:{
    height: "100%",
    marginRight: 15
  },
  bar:{
    width: 8,
    height: 91,
    borderRadius: 10
  },
  courseInfoContainer: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  courseSubtitle: {
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: 10,
  },
  infoIconContainer: {
    paddingTop: 20,
    height: "100%",
    width: 40,
  },
  infoIcon: {
    padding: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    height: "90%"
  },
  pathItemWrapper: {
    width: "33.33%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
    height: "22%",
    marginVertical: 10,
  },
  emptyCell: {
    width: "33.33%",
    height: "22%",
    marginVertical: 10
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
    fontSize: 16,
    marginTop: 5,
  },
});

export default styles;
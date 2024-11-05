import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: "bold",
  },
  courseImageContainer: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  courseImage: {
    width: 194,
    height: 194,
    marginBottom: 10,
  },
  courseContentContainer: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  courseInfo: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 15,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F7B801",
  },
  courseTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: Colors.dark.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  continueButtonText: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  inspirationButton: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inspirationButtonText: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  inspirationIcon: {
    marginLeft: 10,
    color: Colors.dark.text,
  },
});

export default styles;

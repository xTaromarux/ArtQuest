import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  borderOutsideContainer: {
    height: 12,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignContent: "center",
    padding: 2,
  },
  borderInsideContainer: {
    height: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 2,
  },
  container: {
    height: 6,
    width: "100%",
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 10,
  },
});

export default styles;

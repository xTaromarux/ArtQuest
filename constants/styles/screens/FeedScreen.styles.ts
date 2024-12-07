import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingBottom: 90,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
  },
  floatingButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    width: 70,
    height: 70,
    position: "absolute",
    right: 20,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.dark.background,
    overflow: "hidden",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
});

export default styles;

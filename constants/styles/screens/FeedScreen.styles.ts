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
    backgroundColor: "#1C9BF0",
    borderRadius: 25,
    padding: 15,
    position: "absolute",
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
});

export default styles;

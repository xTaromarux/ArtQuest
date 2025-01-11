import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingBottom: 90,
    paddingTop:30
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
    bottom: "15%",
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  errorText: {
    color: Colors.light.text,
    fontSize: 16,
    marginBottom: 10,
  },
  retryText: {
    color: Colors.light.tint,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  
});

export default styles;

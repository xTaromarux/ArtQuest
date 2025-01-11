import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    width: "100%",
    fontWeight: "bold",
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    width: "40%",
    height: "80%",
    resizeMode: "contain",
    margin: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "center",
    height: 50,
  },
  buttonTextDark: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;

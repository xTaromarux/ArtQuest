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
  rowSplit: {
    flexDirection: "row",
  },
  textContainer: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    resizeMode: "contain",
    margin: 10,
  },
  miniContainer: {
    width: "40%",
    height: "70%",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
    margin: 10,
  },
  innerContainer: {
    width: "85%",
    height: "65%",
    marginTop: 3,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  smallText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 4,
    paddingBottom: 2,
  },
});

export default styles;

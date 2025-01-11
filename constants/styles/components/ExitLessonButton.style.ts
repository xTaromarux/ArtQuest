import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerSquare: {
    width: 50,
    height: 50,
    backgroundColor: "#9E9E9E",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
  innerSquare: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 8,
    marginRight: 1,
    borderColor: "#9E9E9E",
    borderWidth: 1,
    paddingRight: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSquarePressed: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 0,
    marginRight: 0,
    borderWidth: 0,
    paddingRight: 5,
    borderColor: "#FFFFF",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;

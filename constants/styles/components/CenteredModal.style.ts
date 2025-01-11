import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    color: Colors.dark.text,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  noButton: {
    width: "100%",
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  yesButton: {
    width: "100%",
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  yesButtonText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "bold",
  },
  noButtonText: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: "bold",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "20%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    height: "80%",
    paddingVertical: 10,
  },
  inputContainer: {
    width: "100%",
    height: "60%",
  },
  input: {
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 5,
    padding: 10,
    height: 50,
    width: "100%",
    marginBottom: 10,
    color: Colors.dark.text,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 5,
    color: Colors.dark.text,
    fontSize: 14,
  },
  link: {
    color: Colors.dark.tintLightGreen,
    fontWeight: "bold",
  },
});

export default styles;

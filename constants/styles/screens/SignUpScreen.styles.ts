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
    height: "15%",
  },
  subtitleContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "100%",
    height: "5%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
    textAlign: "center",
  },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "15%",
  },
  socialButton: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "flex-start",
  },
  socialButtonText: {
    alignItems: "center",
    color: Colors.dark.text,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "5%",
    marginBottom: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.background,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.dark.text,
  },
  inputRow: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "15%",
  },
  tintInputRow: {
    width: "100%",
    height: "40%",
  },
  tintInput: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.dark.tintDarkerGreen,
    color: Colors.dark.text,
    borderWidth: 3,
    alignItems: "flex-start",
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: Colors.dark.text,
  },
  continueButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default styles;

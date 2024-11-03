import { StyleSheet } from "react-native";
import Colors from "../Colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "20%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
    marginBottom: 20,
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
    padding: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "flex-start",
  },
  socialButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "10%",
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
  formContainer: {
    width: "100%",
    height: "55%",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 3,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: Colors.dark.text,
  },
  continueButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color: Colors.dark.text,
    fontSize: 14,
  },
  link: {
    color: Colors.dark.tintLightGreen,
    fontWeight: "bold",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10
  },
});

export default styles;

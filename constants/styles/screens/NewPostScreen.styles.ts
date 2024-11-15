import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
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
  formContainer: {
    width: "100%",
    height: "55%",
    paddingVertical: 10,
  },
  imagePickerContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  imagePickerButton: {
    width: 110,
    height: 110,
    backgroundColor: Colors.light.background,
    borderColor: Colors.dark.background,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 60,
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
  },
  profileLabel: {
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default styles;

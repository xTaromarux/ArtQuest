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
    height: 100,
    borderWidth: 3,
    textAlignVertical: 'top',
    paddingTop: 5,
    borderColor: Colors.dark.tintDarkerGreen,
    borderRadius: 10,
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
  header:{
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 40,
  },
  formContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  imagePickerContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  imagePickerButton: {
    width: "100%",
    height: 420,
    backgroundColor: Colors.light.background,
    borderColor: Colors.dark.background,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  importIcon: {
    width: "100%",
    height: "10%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  importImage: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30
  },
  avatarContainer: {
    width: "100%",
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 60,
    marginBottom: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  noImage: {
    width: "40%",
    height: "40%",
    borderRadius: 20,
  },
  newPostLabelContainer:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  newPostLabel: {
    fontSize: 32,
    fontWeight: "bold",
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

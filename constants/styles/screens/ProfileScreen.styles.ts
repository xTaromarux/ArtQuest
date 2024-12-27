import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  backgroundImage: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },

  contentContainer: {
    paddingHorizontal: 20
  },
  profileHeader: {
    alignItems: "flex-start",
    height: 220,
    justifyContent: "flex-end",
    marginBottom: 20,
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
    borderWidth: 0,
    borderRadius: 60,
  },
  userInfoContainer:{
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  userContainer:{
    width: "65%",
    height: "100%"
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userHandle: {
    fontSize: 14,
    color: "#A5A5A5",
  },
  joinDate: {
    marginTop: 10,
    fontSize: 14,
    color: "#A5A5A5",
    marginBottom: 10,
  },
  editProfileContainer:{
    width: "35%",
    height: "100%"
  },
  editProfileButton: {
    height: 35,
    borderWidth: 3,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  editProfileButtonText: {
    color: Colors.dark.text,
    fontSize: 15,
    fontWeight: "bold"
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.background,
    marginBottom: 10,
  },
  noAchievementsText: {
    fontSize: 16,
    color: "#888", // Szary kolor dla tekstu
    textAlign: "center",
    marginTop: 10,
  },  
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  statItem: {
    width: "46.5%",
    backgroundColor: Colors.light.background,
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    marginRight: 5,
  },
  statTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  achievementsContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 10,
  },
  achievementItem: {
    width: 150,
    borderRightWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: Colors.dark.tintDarkGreen
  },
  achievementIcon: {
    width: 120,
    height: 120,
    margin: 10
  },
  infoIconContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalContent: {
    padding: 16,
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
  iconModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalIcon: {
    width: 150,
    height: 150,
  },
  titleModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20, 
    marginVertical: 10
  },
  modalText:{
    fontSize: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  profileLabel: {
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  inputGroupContainer:{
    alignItems: "center",
    flexDirection: "row",
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
  buttonsContainer: {
    width: "100%",
    height: "19%",
  },
  buttonSave: {
    width: "100%",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "center",
    height: 50,
    marginBottom: 10,
    marginTop: 100,
  },
  buttonDelete: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    height: 50,
    marginTop: 25,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
  },
  buttonTextDark: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextLight: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
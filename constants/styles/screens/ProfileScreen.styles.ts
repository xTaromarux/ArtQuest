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
  }
});

export default styles;
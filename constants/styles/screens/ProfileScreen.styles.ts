import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  profileHeaderBackground:{
    // height: 160
  },
  profileHeader: {
    alignItems: "flex-start",
    height: 253,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: Colors.light.background,
    borderWidth: 3,
    borderRadius: 60,
    marginBottom: 10,
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
    fontSize: 12,
    color: "#A5A5A5",
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  statItem: {
    width: "45%",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  achievementsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  achievementItem: {
    width: "30%",
    alignItems: "center",
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
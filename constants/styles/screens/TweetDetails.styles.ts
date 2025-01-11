import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
  },

  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: Colors.dark.background,
    paddingBottom: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  tweetContent: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  commetnDetailsCOntainer: {
    flexDirection: "column",
    width: "80%",
  },
  userInfo: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "bold",
    marginRight: 10,
  },
  username: {
    color: "gray",
    marginLeft: 10,
  },
  commetnConteiner: {
    width: "100%",
  },
  commentContent: {
    color: Colors.light.text,
  },
  newCommentContainer: {
    flexDirection: "row",
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  input: {
    width: "90%",
    height: 40,
    padding: 10,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomStartRadius: 10,
    color: Colors.dark.text,
  },
  floatingButton: {
    height: 40,
    backgroundColor: Colors.light.background,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;

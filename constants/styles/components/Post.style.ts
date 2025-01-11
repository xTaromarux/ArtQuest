import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 10,
    margin: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  header: {
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userInfo: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    flexDirection: "row",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10,
  },
  username: {
    color: "gray",
    marginLeft: 10,
  },
  menu: {
    marginLeft: "auto",
  },
  content: {
    width: "100%",
    color: Colors.light.text,
    height: "100%",
    fontSize: 14,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});


export default styles;

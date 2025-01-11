import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  platformBase: {
    width: 50,
    height: 50,
    backgroundColor: "#3D3D3D",
    transform: [{ rotateX: "45deg" }, { rotateZ: "0.785398rad" }],
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  platformSupportRight: {
    width: 22,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    right: 24,
    bottom: -5,
    backgroundColor: "#3D3D3D",
  },
  platformSupportLeft: {
    width: 22,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    left: 13,
    bottom: 16,
    backgroundColor: "#3D3D3D",
  },
  platformMiddle: {
    width: 50,
    height: 50,
    backgroundColor: "#ADADAD",
    borderRadius: 5,
    position: "absolute",
    top: -11,
    right: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  platformTop: {
    width: 36,
    height: 36,
    backgroundColor: "#3D3D3D",
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
  },
  title: {
    marginTop: 8,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default styles;

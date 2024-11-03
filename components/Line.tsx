import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

const Line = () => {
  return (
    <View style={styles.container} darkColor="true">
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    alignSelf: "flex-start",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: 'white'
  },
});

export default Line;

import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import styles from "@/constants/styles/screens/ModalScreen,styles";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

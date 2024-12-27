import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert("Błąd", "Wystąpił problem podczas wylogowywania.");
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <MaterialIcons
        name="logout"
        size={25}
        color={Colors.dark.tintDarkerGreen}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton:{
    width: 45,
    height: 45,
    marginTop: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    backgroundColor: Colors.light.background,
    borderColor: Colors.dark.background,
    borderWidth: 3,
    borderRadius: 60
  },
});

export default LogoutButton;

import React from "react";
import { Dimensions, KeyboardAvoidingView, Platform, useWindowDimensions, View } from "react-native";
import styles from "@/constants/styles/screens/CoursesScreen.styles";
import LogoutButton from "@/components/LogoutButton";

const ExerciseScreen: React.FC = () => {
  const height = Dimensions.get('screen').height;

  return (
    <KeyboardAvoidingView
      style={[styles.container, {height: height}]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <LogoutButton />
      
    </KeyboardAvoidingView>
  );
};

export default ExerciseScreen;

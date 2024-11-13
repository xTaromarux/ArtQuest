
import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";

const AchievementItem: React.FC<{ source: any }> = ({ source }) => {
  return (
    <View style={styles.achievementItem}>
      <Image source={source} style={styles.achievementIcon} />
    </View>
  );
};

export default AchievementItem;
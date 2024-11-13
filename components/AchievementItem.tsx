import React from "react";
import { View, ImageStyle } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";

interface AchievementItemProps {
  source: any;
  style?: ImageStyle;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ source, style }) => {
  return (
    <View style={[styles.achievementItem, style]}>
      <Image source={source} style={styles.achievementIcon} />
    </View>
  );
};

export default AchievementItem;
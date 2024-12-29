import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import CustomImage from "./CustomImage";
import API_BASE_URL from "@/utils/config";
import { Achievement } from "@/utils/types";

interface AchievementItemProps {
  source: any;
  style?: ViewStyle;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ source, style }) => {

  return (
    <View style={[styles.achievementItem, style]}>
      <CustomImage url={`${API_BASE_URL}/api/picture/${source.uri}`} style={styles.achievementIcon} />
    </View>
  );
};

export default AchievementItem;

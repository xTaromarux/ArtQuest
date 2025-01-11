import React from "react";
import { View} from "react-native";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import CustomImage from "./CustomImage";
import API_BASE_URL from "@/utils/config";
import { AchievementItemProps } from "@/utils/types";

const AchievementItem: React.FC<AchievementItemProps> = ({ source, style }) => {

  return (
    <View style={[styles.achievementItem, style]}>
      <CustomImage url={`${API_BASE_URL}/api/picture/${source.uri}`} style={styles.achievementIcon} />
    </View>
  );
};

export default AchievementItem;

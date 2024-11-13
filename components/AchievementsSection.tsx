import React from "react";
import { View, Text, ScrollView } from "react-native";
import AchievementItem from "@/components/AchievementItem";
import styles from "@/constants/styles/screens/ProfileScreen.styles";

const AchievementsSection: React.FC = () => {
  const achievements = [
    require("@/assets/images/achievement_no_1.png"),
    require("@/assets/images/achievement_no_2.png"),
    require("@/assets/images/achievement_no_3.png"),
  ];

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <ScrollView horizontal={true} style={styles.achievementsContainer}>
        {achievements.map((source, index) => (
          <AchievementItem
            key={index}
            source={source}
            style={index === achievements.length - 1 ? { borderRightWidth: 0 } : {}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AchievementsSection;
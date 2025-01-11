import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AchievementItem from "@/components/AchievementItem";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import API_BASE_URL from "@/utils/config";
import { Achievement } from "@/utils/types";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text style={styles.noAchievementsText}>No achievements unlocked yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <ScrollView horizontal={true} style={styles.achievementsContainer}>
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={index}
            source={{ uri: achievement.picture_id }}
            style={index === achievements.length - 1 ? { borderRightWidth: 0 } : {}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AchievementsSection;

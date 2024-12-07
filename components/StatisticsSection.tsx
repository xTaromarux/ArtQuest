import React from "react";
import { View, Text } from "react-native";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import StatItem from "./StatItem";

const StatisticsSection: React.FC = () => {
  const stats = [
    { icon: "fire", value: 123, label: "Day strike" },
    { icon: "progress-star", value: 254, label: "Total exp" },
    { icon: "draw", value: 2, label: "Drawn drawings" },
    { icon: "book-education-outline", value: 10, label: "Lessons Done" },
  ];

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Statistics</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon as any}
            value={stat.value}
            label={stat.label}
          />
        ))} 
      </View>
    </View>
  );
};

export default StatisticsSection;
import React from "react";
import { View, Text } from "react-native";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import StatItem from "./StatItem";
import { Statistic, StatisticsSectionProps } from "@/utils/types";

const calculateDayStrike = (startStrike: string, endStrike: string): number => {
  const startDate = new Date(startStrike);
  const endDate = new Date(endStrike);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  statistics,
}) => {
  const stats: Statistic[] = [
    {
      icon: "fire",
      value: calculateDayStrike(statistics.start_strike, statistics.end_strike),
      label: "Day strike",
    },
    { icon: "progress-star", value: statistics.experience, label: "Total exp" },
    { icon: "draw", value: statistics.courses, label: "Courses Done" },
    { icon: "book-education-outline", value: statistics.level, label: "Level" },
  ];

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Statistics</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </View>
    </View>
  );
};

export default StatisticsSection;

import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import Colors from "@/constants/Colors";

interface StatItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <View style={styles.statItem}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={Colors.dark.background}
        style={styles.statIcon}
      />
      <View style={styles.statTextContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
};

export default StatItem;
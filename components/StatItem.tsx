import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import Colors from "@/constants/Colors";
import { StatItemProps } from "@/utils/types";

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <View style={styles.statItem}>
      <MaterialCommunityIcons
        name={icon}
        size={30}
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

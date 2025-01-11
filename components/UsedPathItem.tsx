import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "@/constants/styles/components/UsedPathItem.style";
import { PathItemProps } from "@/utils/types";

const UsedPathItem: React.FC<PathItemProps> = ({ icon, title }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={48}
        color="#C4C4C4"
        style={{ marginBottom: 10 }}
      />

      <View style={styles.platformBase}>
        <View style={styles.platformSupportLeft} />
        <View style={styles.platformSupportRight} />
        <View style={styles.platformMiddle}>
          <View style={styles.platformTop} />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default UsedPathItem;

import styles from "@/constants/styles/components/ProgressBar.style";
import { ProgressBarProps } from "@/utils/types";
import React from "react";
import { View } from "react-native";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <View style={styles.borderOutsideContainer}>
      <View style={styles.borderInsideContainer}>
        <View style={styles.container}>
          <View
            style={[
              styles.progress,
              {
                width: `${progress * 100}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

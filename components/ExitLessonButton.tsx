import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { View } from "@/components/Themed";
import { forwardRef } from "react";
import { ExitLessonButtonProps } from "@/utils/types";
import styles from "@/constants/styles/components/ExitLessonButton.style";

const ExitLessonButton = (
  {
    onPress,
    onLongPress,
    disabled,
    activeOpacity,
    iconName,
  }: ExitLessonButtonProps,
  ref: any
) => {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.outerSquare}>
      <TouchableOpacity
        ref={ref}
        style={pressed ? styles.innerSquarePressed : styles.innerSquare}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
      >
        <FontAwesome
          size={25}
          name="times"
          style={{ paddingLeft: 5 }}
          color={pressed ? "#A9A9A9" : "#D9D9D9"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default forwardRef(ExitLessonButton);

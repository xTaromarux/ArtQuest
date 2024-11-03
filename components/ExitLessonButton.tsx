import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Text, View } from "@/components/Themed";
import { forwardRef } from "react";

type ExitLessonButtonProps = {
  onPress:any,
  onLongPress:any,
  disabled:any,
  activeOpacity:any,
  iconName: any
}

const ExitLessonButton = (
  {
    onPress,
    onLongPress,
    disabled,
    activeOpacity,
    iconName
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

const styles = StyleSheet.create({

  outerSquare: {
    width: 50,
    height: 50,
    backgroundColor: "#9E9E9E",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
  innerSquare: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 8,
    marginRight: 1,
    borderColor:"#9E9E9E",
    borderWidth: 1,
    paddingRight: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSquarePressed: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 0,
    marginRight: 0,
    borderWidth: 0,
    paddingRight: 5,
    borderColor:"#FFFFF",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default forwardRef(ExitLessonButton);

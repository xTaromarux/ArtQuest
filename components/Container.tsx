import Colors from "@/constants/Colors";
import { ContainerProps } from "@/utils/types";
import React from "react";
import { View, StyleSheet } from "react-native";

const Container: React.FC<ContainerProps> = ({
  height,
  width,
  style,
  children,
}) => {
  return (
    <View style={[styles.container, { height }, { width: `${width}%` }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Container;

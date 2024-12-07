import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
  } from "react-native-reanimated";
import { router } from "expo-router";
import { Exercise } from "@/utils/types";
interface PathItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  exercise: Exercise;
}

const PathItem: React.FC<PathItemProps> = ({ icon, title, exercise }) => {
    const [clicked, setClicked] = useState(false);
    const platformTopOfTheTopPosition = useSharedValue({ top: -8, right: 9 });
  
    // Animation styles
    const platformTopOfTheTopStyle = useAnimatedStyle(() => ({
      top: withTiming(clicked ? 5 : platformTopOfTheTopPosition.value.top, { duration: 500 }),
      right: withTiming(clicked ? 5 : platformTopOfTheTopPosition.value.right, { duration: 500 }),
    }));
  
    const platformTopStyle = useAnimatedStyle(() => ({
      opacity: withTiming(clicked ? 0 : 1, { duration: 5 }),
    }));
  
    const platformTopSupportStyle = useAnimatedStyle(() => ({
      opacity: withTiming(clicked ? 0 : 1, { duration: 5 }),
    }));
  
    const handlePress = () => {
      // setClicked((prev) => !prev);
      setClicked(true);
      router.push({
        pathname: `../../exercise/[id]`,
        params: {
          id: exercise.id,
          exercise: JSON.stringify(exercise),
        },
      });
    };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {/* Icon at the top */}
      <MaterialCommunityIcons
        name={icon}
        size={48}
        color="#C4C4C4"
        style={{ marginBottom: 10 }}
      />

      {/* 3D-stacked platform */}
      <View style={styles.platformBase}>
        <View style={styles.platformBaseSupportLeft} />
        <View style={styles.platformBaseSupportRight} />
        <View style={styles.platformMiddle}>
          <Animated.View style={[styles.platformTop, platformTopStyle]}>
            <Animated.View
              style={[styles.platformTopSupportLeft, platformTopSupportStyle]}
            />
            <Animated.View
              style={[styles.platformTopSupportRight, platformTopSupportStyle]}
            />
            <Animated.View
              style={[styles.platformTopOfTheTop, platformTopOfTheTopStyle]}
            />
          </Animated.View>
        </View>
      </View>

      {/* Label below */}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PathItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  platformBase: {
    width: 50,
    height: 50,
    backgroundColor: "#3D3D3D",
    transform: [{ rotateX: "45deg" }, { rotateZ: "0.785398rad" }],
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  platformBaseSupportRight: {
    width: 22,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    right: 24,
    bottom: -5,
    backgroundColor: "#3D3D3D",
  },
  platformBaseSupportLeft: {
    width: 22,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    left: 13,
    bottom: 16,
    backgroundColor: "#3D3D3D",
  },
  platformMiddle: {
    width: 50,
    height: 50,
    backgroundColor: "#ADADAD",
    borderRadius: 5,
    position: "absolute",
    top: -11,
    right: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  platformTop: {
    width: 36,
    height: 36,
    backgroundColor: "#3D3D3D",
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
  },
  platformTopSupportRight: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    right: 8,
    bottom: -2,
    backgroundColor: "#3D3D3D",
  },
  platformTopSupportLeft: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    left: 14,
    bottom: 6,
    backgroundColor: "#3D3D3D",
  },
  platformTopOfTheTop: {
    width: 35,
    height: 35,
    backgroundColor: "#ADADAD",
    borderRadius: 5,
    position: "absolute",
    top: -8,
    right: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

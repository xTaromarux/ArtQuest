import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

interface IconButtonProps {
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
  solid: boolean;
  color: string;
  text: number;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, solid, color, text, onPress }) => {
  const [isSolid, setIsSolid] = useState(solid);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = 1.2; 
    scale.value = withTiming(1, { duration: 300 }); 

    setIsSolid((prev) => !prev); 
    onPress(); 
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <FontAwesome5 name={icon} size={24} color={color} solid={isSolid} />
      </Animated.View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default IconButton;

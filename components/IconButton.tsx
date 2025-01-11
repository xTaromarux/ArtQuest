import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { IconButtonProps } from "@/utils/types";
import styles from "@/constants/styles/components/IconButton.style";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  solid,
  color,
  text,
  onPress,
}) => {
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

export default IconButton;

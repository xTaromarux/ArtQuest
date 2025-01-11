import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedIconProps } from '@/utils/types';


const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, color, size, focused, library }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(focused ? 1.2 : 1, { duration: 200 }) }],
    };
  });

  const IconComponent = library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;

  return (
    <Animated.View style={animatedStyle}>
      <IconComponent name={name as any} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedIcon;

import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type IconLibrary = 'Ionicons' | 'MaterialCommunityIcons';

// Typy dla nazw ikon każdej biblioteki
type IoniconsName = keyof typeof Ionicons.glyphMap;
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

type AnimatedIconProps = {
  name: IoniconsName | MaterialCommunityIconsName;
  color: string;
  size: number;
  focused: boolean;
  library: IconLibrary;
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, color, size, focused, library }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(focused ? 1.2 : 1, { duration: 200 }) }],
    };
  });

  // Wybierz odpowiednią bibliotekę ikon na podstawie wartości `library`
  const IconComponent = library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;

  return (
    <Animated.View style={animatedStyle}>
      <IconComponent name={name as any} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedIcon;

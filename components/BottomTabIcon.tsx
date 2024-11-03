import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface BottomTabIconProps {
  route: string;
  isFocused: boolean;
  color: string;
  size: number;
}

const BottomTabIcon: React.FC<BottomTabIconProps> = ({ route, isFocused, color, size }) => {
  let iconNameIonicons: keyof typeof Ionicons.glyphMap;
  let iconNameMaterialCommunity: keyof typeof MaterialCommunityIcons.glyphMap;
  let IconComponent: typeof Ionicons | typeof MaterialCommunityIcons;

  switch (route) {
    case 'home':
      iconNameIonicons = isFocused ? 'home' : 'home-outline';
      IconComponent = Ionicons;
      return <IconComponent name={iconNameIonicons} size={size} color={color} />;
    case 'feed':
      iconNameIonicons = isFocused ? 'search' : 'search-outline';
      IconComponent = Ionicons;
      return <IconComponent name={iconNameIonicons} size={size} color={color} />;
    case 'courses':
      iconNameMaterialCommunity = isFocused ? 'clipboard-search' : 'clipboard-search-outline';
      IconComponent = MaterialCommunityIcons;
      return <IconComponent name={iconNameMaterialCommunity} size={size} color={color} />;
    case 'exercise':
      iconNameMaterialCommunity = isFocused ? 'clipboard-text-play' : 'clipboard-text-play-outline';
      IconComponent = MaterialCommunityIcons;
      return <IconComponent name={iconNameMaterialCommunity} size={size} color={color} />;
    case 'profile':
      iconNameIonicons = isFocused ? 'person-circle' : 'person-circle-outline';
      IconComponent = Ionicons;
      return <IconComponent name={iconNameIonicons} size={size} color={color} />;
    default:
      return null;
  }
};

export default BottomTabIcon;

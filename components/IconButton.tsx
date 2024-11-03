import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type IconButtonProps = {
  icon: React.ComponentProps<typeof FontAwesome5>['name'];
  text?: string | number;
  color?: string;
  solid?: boolean;
};

const IconButton = ({ icon, text, color, solid }: IconButtonProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5 name={icon} size={18} color={color} solid={solid} />
      <Text style={{ fontSize: 12, color: 'gray' }}>{text}</Text>
    </View>
  );
};

export default IconButton;
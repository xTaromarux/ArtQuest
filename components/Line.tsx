import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import styles from "@/constants/styles/components/Line.style";
import { LineProps } from "@/utils/types";

const Line = ({ width, backgroundColor, style }: LineProps) => {
  return (
    <View
      style={[styles.container, { width: `${width}%` }, style]}
      darkColor="true"
    >
      <View style={[styles.line, {backgroundColor: backgroundColor ? backgroundColor : Colors.light.background}]}></View>
    </View>
  );
};

export default Line;
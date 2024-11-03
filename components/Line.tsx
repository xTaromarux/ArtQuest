import { View } from "@/components/Themed";
import styles from "@/constants/styles/Line.style";

const Line = ({ padding }: { padding: number }) => {
  return (
    <View
      style={[styles.container, { paddingHorizontal: padding }]}
      darkColor="true"
    >
      <View style={styles.line}></View>
    </View>
  );
};

export default Line;

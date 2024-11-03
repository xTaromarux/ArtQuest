import { StyleSheet } from 'react-native';
import Colors from '../Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute",
        bottom: 90,
        justifyContent: "flex-start",
        width: "100%",
        alignSelf: "flex-start",
      },
      line: {
        width: "100%",
        height: 2,
        backgroundColor: Colors.light.background
      },
  });

  export default styles;
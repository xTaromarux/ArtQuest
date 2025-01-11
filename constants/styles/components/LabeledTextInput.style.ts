import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      marginBottom: 2,
      color: "#333",
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 3,
      borderColor: Colors.dark.background,
      borderRadius: 10,
      overflow: "hidden",
    },
    input: {
      flex: 1,
      padding: 10,
      color: "#333",
    },
    iconContainer: {
      paddingHorizontal: 10,
    },
  });
  
  export default styles;
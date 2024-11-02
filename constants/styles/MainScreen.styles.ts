import { StyleSheet } from 'react-native';
import Colors from '../Colors';


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.dark.background,
    },
    contentContainer: {
      width: "100%",
      height: "81%",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: Colors.dark.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: Colors.dark.text,
      fontWeight: "bold",
      width: "90%",
      textAlign: "center",
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      color: Colors.dark.text,
      textAlign: "center",
      marginTop: 10,
      marginBottom: 20,
      width: "75%",
    },
    buttonsContainer: {
      width: "100%",
      height: "19%",
    },
    buttonSignUp: {
      width: "100%",
      padding: 12,
      borderRadius: 10,
      borderColor: Colors.dark.tintDarkerGreen,
      borderWidth: 3,
      alignItems: "center",
      height: 50,
      marginBottom: 10,
    },
    buttonSignIn: {
      width: "100%",
      padding: 12,
      borderRadius: 10,
      height: 50,
      backgroundColor: Colors.dark.tintDarkerGreen,
      alignItems: "center",
    },
    buttonTextLight: {
      color: Colors.light.text,
      fontSize: 16,
    },
    buttonTextDark: {
      color: Colors.dark.text,
      fontSize: 16,
    },
    image: {
      width: 162,
      height: 162,
    },
  });

  export default styles;
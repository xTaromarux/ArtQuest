import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    modalText: {
      fontSize: 18,
      marginTop: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "column",
      width: "100%",
    },
    button: {
      height: 50,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    noButton: {
      width: "100%",
      padding: 12,
      borderRadius: 10,
      marginTop: 20,
      backgroundColor: Colors.dark.tintDarkerGreen,
      alignItems: "center",
    },
    yesButton: {
      width: "100%",
      padding: 8,
      borderRadius: 10,
      borderColor: Colors.dark.tintDarkerGreen,
      borderWidth: 3,
      alignItems: "center",
      marginBottom: 10,
      marginTop: 50,
    },
    yesButtonText: {
      fontSize: 16,
      color: Colors.dark.text,
      fontWeight: "bold",
    },
    noButtonText: {
      fontSize: 16,
      color: Colors.light.text,
      fontWeight: "bold",
    },
  });

  export default styles;
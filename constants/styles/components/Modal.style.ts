import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalContent: {
    padding: 20,
  },
  iconModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalIcon: {
    width: 150,
    height: 150,
  },
  titleModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20, 
    marginVertical: 10
  },
  modalText:{
    fontSize: 15,
  },
  });

  export default styles;
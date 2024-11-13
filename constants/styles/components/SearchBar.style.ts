import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: Colors.dark.text,
  },
  searchIcon: {
    marginLeft: 8,
  },
  });

  export default styles;
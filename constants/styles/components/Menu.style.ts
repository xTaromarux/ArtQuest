import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: 90,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  });

  export default styles;
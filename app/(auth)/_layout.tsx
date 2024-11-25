import React, { FC } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack";
import HomeScreen from "./home";
import FeedScreen from "./feed";
import CoursesScreen from "./courses";
import ProfileScreen from "./profile";
import { TabsParamList } from "@/utils/types";
import CustomBottomTab from "@/components/CustomBottomTab";
import ExerciseScreen from "./exercises";

const Tab = createBottomTabNavigator<TabsParamList>();
const Stack = createStackNavigator();

const getScreenOptions = () => {
  return {
    headerShown: false,
    transitionSpec: {
      open: Platform.select({
        ios: TransitionSpecs.TransitionIOSSpec,
        android: TransitionSpecs.FadeInFromBottomAndroidSpec,
        default: TransitionSpecs.TransitionIOSSpec, // Web
      }),
      close: Platform.select({
        ios: TransitionSpecs.TransitionIOSSpec,
        android: TransitionSpecs.FadeInFromBottomAndroidSpec,
        default: TransitionSpecs.TransitionIOSSpec, // Web
      }),
    },
    cardStyleInterpolator: Platform.select({
      ios: CardStyleInterpolators.forHorizontalIOS,
      android: CardStyleInterpolators.forFadeFromBottomAndroid,
      default: CardStyleInterpolators.forHorizontalIOS, // Web
    }),
  };
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={getScreenOptions()}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const FeedStack = () => (
  <Stack.Navigator screenOptions={getScreenOptions()}>
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>
);

const CoursesStack = () => (
  <Stack.Navigator screenOptions={getScreenOptions()}>
    <Stack.Screen name="Courses" component={CoursesScreen} />
  </Stack.Navigator>
);

const ExerciseStack = () => (
  <Stack.Navigator screenOptions={getScreenOptions()}>
    <Stack.Screen name="Exercises" component={ExerciseScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={getScreenOptions()}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AuthLayout: FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#d1c4e9",
        tabBarStyle: {
          backgroundColor: "red",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="feed" component={FeedStack} options={{ headerShown: false }} />
      <Tab.Screen name="courses" component={CoursesStack} options={{ headerShown: false }} />
      <Tab.Screen name="exercises" component={ExerciseStack} options={{ headerShown: false }} />
      <Tab.Screen name="profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default AuthLayout;

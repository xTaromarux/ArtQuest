import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import FeedScreen from "./feed";
import CoursesScreen from "./courses";
import ExerciseScreen from "./exercise";
import ProfileScreen from "./profile";
import { TabsParamList } from "@/utils/types";
import CustomBottomTab from "@/components/CustomBottomTab";

const Tab = createBottomTabNavigator<TabsParamList>();

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
      
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="courses"
        component={CoursesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="exercise"
        component={ExerciseScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AuthLayout;

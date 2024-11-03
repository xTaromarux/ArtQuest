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
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        options={{ title: "Discover" }}
      />
      <Tab.Screen
        name="courses"
        component={CoursesScreen}
        options={{ title: "Courses" }}
      />
      <Tab.Screen
        name="exercise"
        component={ExerciseScreen}
        options={{ title: "Exercise" }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default AuthLayout;

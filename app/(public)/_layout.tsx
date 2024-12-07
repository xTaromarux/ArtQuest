import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;

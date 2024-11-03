import React from "react";
import { Stack } from "expo-router";

const FeedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="tweet/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FeedLayout;

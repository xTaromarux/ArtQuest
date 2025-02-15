// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IoniconsName = 'home-outline';
          if (route.name === 'home') {
            iconName = 'home-outline';
          } else if (route.name === 'login') {
            iconName = 'log-in-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000'
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Strona Główna' }} />
      <Tabs.Screen name="login" options={{ title: 'Logowanie' }} />
    </Tabs>
  );
}

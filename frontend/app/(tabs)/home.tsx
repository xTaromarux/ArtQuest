// app/(tabs)/home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Witamy w ArtQuest!</Text>
      <Button title="Przejdź do logowania" onPress={() => router.push('/login')} />
    </View>
  );
}

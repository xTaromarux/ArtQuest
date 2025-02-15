// app/(tabs)/modal.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>To jest modal!</Text>
      <Button title="Zamknij modal" onPress={() => router.back()} />
    </View>
  );
}

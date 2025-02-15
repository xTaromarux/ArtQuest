import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>To jest modal!</Text>
      <Button title="Zamknij modal" onPress={() => router.back()} />
    </View>
  );
}

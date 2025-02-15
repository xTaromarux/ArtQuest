// app/(tabs)/not-found.tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Nie znaleziono takiej strony!</Text>
    </View>
  );
}

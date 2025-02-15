// app/(tabs)/index.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
      <Text>Witaj w ArtQuest!</Text>
      <Link href="/(tabs)/task/1" asChild>
        <Button title="Zobacz zadanie o ID 1" onPress={() => {}} />
      </Link>
    </View>
  );
}

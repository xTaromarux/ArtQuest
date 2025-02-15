// app/(tabs)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AuthService from '../../services/AuthService';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      Alert.alert('Sukces', 'Zalogowano pomyślnie');
      // Po logowaniu możesz przekierować użytkownika do strony głównej
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Błąd', error.response?.data?.message || 'Błąd logowania');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Wprowadź email"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Text style={{ marginBottom: 10 }}>Hasło:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Wprowadź hasło"
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
      />
      <Button title="Zaloguj się" onPress={handleLogin} />
    </View>
  );
}

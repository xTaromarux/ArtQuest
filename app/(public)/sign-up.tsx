import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Container from '@/components/Container';
import { useSignUp, useSignIn } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

const SignUpScreen: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const { signIn } = useSignIn();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Utwórz konto
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      // Weryfikacja użytkownika (np. email)
      await signUp.prepareEmailAddressVerification();

      Alert.alert('Weryfikacja', 'Sprawdź swoją skrzynkę e-mail, aby potwierdzić rejestrację.');
    } catch (error: any) {
      Alert.alert('Błąd', error.errors[0]?.message || 'Wystąpił błąd podczas rejestracji');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'oauth_github' | 'oauth_google') => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: Linking.createURL('/oauth-callback'), // URL po kliknięciu opcji logowania
        redirectUrlComplete: Linking.createURL('/home'), // URL po zakończeniu procesu logowania
      });
    } catch (error: any) {
      Alert.alert('Błąd', 'Nie udało się zalogować przez ' + provider);
    }
  };

  return (
    <View style={styles.screen}>
      <Container height={500}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>to continue</Text>

        {/* Logowanie przez GitHub i Google */}
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOAuthSignIn('oauth_github')}>
          <Text style={styles.socialButtonText}>Continue with GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => handleOAuthSignIn('oauth_google')}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Formularz rejestracji */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.continueButton} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.continueButtonText}>{loading ? 'LOADING...' : 'CONTINUE'}</Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialButton: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#333',
    marginHorizontal: 5,
  },
  continueButton: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#002F5A',
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;

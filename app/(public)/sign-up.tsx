import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Container from "@/components/Container";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import styles from "@/constants/styles/SignupScreen.styles";

const SignUpScreen: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const { signIn } = useSignIn();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
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

      Alert.alert(
        "Weryfikacja",
        "Sprawdź swoją skrzynkę e-mail, aby potwierdzić rejestrację."
      );
    } catch (error: any) {
      Alert.alert(
        "Błąd",
        error.errors[0]?.message || "Wystąpił błąd podczas rejestracji"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (
    provider: "oauth_github" | "oauth_google"
  ) => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: Linking.createURL("/oauth-callback"), // URL po kliknięciu opcji logowania
        redirectUrlComplete: Linking.createURL("/home"), // URL po zakończeniu procesu logowania
      });
    } catch (error: any) {
      Alert.alert("Błąd", "Nie udało się zalogować przez " + provider);
    }
  };

  return (
    <View style={styles.screen}>
      <Container height={500}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your account</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Continue with</Text>
        </View>
        <View style={styles.socialButtonsContainer}>
          {/* Logowanie przez Google */}
          <TouchableOpacity
            style={[styles.socialButton, { marginRight: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_github")}
          >
            <Image
              source={require("@/assets/images/google.png")}
              style={styles.image}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          {/* Logowanie przez Github */}
          <TouchableOpacity
            style={[styles.socialButton, { marginLeft: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_google")}
          >
            <Image
              source={require("@/assets/images/github.png")}
              style={styles.image}
            />
            <Text style={styles.socialButtonText}>Github</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Formularz rejestracji */}
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.tintInput, { marginRight: 5 }]}
            placeholder="Login"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.tintInput, { marginLeft: 5 }]}
            placeholder="Username"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.tintInputRow}>
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

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "LOADING..." : "CONTINUE"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?
            <Link href="/sign-in" asChild>
              <Text style={styles.link}> Sign in</Text>
            </Link>
          </Text>
        </View>
      </Container>
    </View>
  );
};

export default SignUpScreen;

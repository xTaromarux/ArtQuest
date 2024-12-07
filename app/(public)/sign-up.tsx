import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import Container from "@/components/Container";
import { useSignUp } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link } from "expo-router";
import styles from "@/constants/styles/screens/SignUpScreen.styles";

const SignUpScreen: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get('screen').height;

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
    if (!signUp) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: Linking.createURL("/oauth-callback"), // URL po kliknięciu opcji rejestracji
        redirectUrlComplete: Linking.createURL("/home"), // URL po zakończeniu procesu rejestracji
      });
    } catch (error: any) {
      Alert.alert(
        "Błąd",
        `Nie udało się zarejestrować przez ${provider === "oauth_google" ? "Google" : "GitHub"}.`
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, {height: height}]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Container height={500} width={80}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your account</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Continue with</Text>
        </View>
        <View style={styles.socialButtonsContainer}>
          {/* Rejestracja przez Google */}
          <TouchableOpacity
            style={[styles.socialButton, { marginRight: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_google")}
          >
            <Image
              source={require("@/assets/images/google.png")}
              style={styles.image}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          {/* Rejestracja przez Github */}
          <TouchableOpacity
            style={[styles.socialButton, { marginLeft: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_github")}
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
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.tintInput, { marginLeft: 5 }]}
            placeholder="Last name"
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
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

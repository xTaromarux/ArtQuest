import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import Container from "@/components/Container";
import { useSignIn } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link } from "expo-router";
import styles from "@/constants/styles/SignInScreen.styles";

const SignInScreen: React.FC = () => {
  const { isLoaded, signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        Alert.alert("Sukces", "Zalogowano pomyślnie!");
        // Możesz przekierować użytkownika do głównego ekranu aplikacji
      } else {
        Alert.alert("Weryfikacja", "Sprawdź swoją skrzynkę e-mail.");
      }
    } catch (error: any) {
      Alert.alert(
        "Błąd",
        error.errors[0]?.message || "Wystąpił problem podczas logowania."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (
    provider: "oauth_google" | "oauth_github"
  ) => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: Linking.createURL("/oauth-callback"),
        redirectUrlComplete: Linking.createURL("/home"),
      });
    } catch (error: any) {
      Alert.alert(
        "Błąd",
        `Nie udało się zalogować przez ${provider === "oauth_google" ? "Google" : "GitHub"}.`
      );
    }
  };

  return (
    <View style={styles.screen}>
      <Container height={500}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>to continue to Getting Started</Text>
          <Text style={styles.subtitle}>Continue with</Text>
        </View>
        <View style={styles.socialButtonsContainer}>
          {/* Logowanie przez Google */}
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

          {/* Logowanie przez Github */}
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
        <View style={styles.formContainer}>
          {/* Formularz logowania */}
          <TextInput
            style={styles.input}
            placeholder="Email address/Login"
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
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "LOADING..." : "CONTINUE"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            No account?
            <Link href="/sign-up" asChild>
              <Text style={styles.link}> Sign up</Text>
            </Link>
            <br />
            Forgot your password?
            <Link href="/reset" asChild>
              <Text style={styles.link}> Reset it here</Text>
            </Link>
          </Text>
        </View>
      </Container>
    </View>
  );
};

export default SignInScreen;
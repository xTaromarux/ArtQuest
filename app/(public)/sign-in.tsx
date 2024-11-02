import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Container from "@/components/Container";
import { useSignIn } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link } from "expo-router";

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

  const handleOAuthSignIn = async () => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/oauth-callback"),
        redirectUrlComplete: Linking.createURL("/home"),
      });
    } catch (error: any) {
      Alert.alert("Błąd", "Nie udało się zalogować przez Google.");
    }
  };

  return (
    <View style={styles.screen}>
      <Container height={500}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>to continue to Getting Started</Text>

        {/* Logowanie przez Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleOAuthSignIn}
        >
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Formularz logowania */}
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
            <Text style={styles.link}>Sign up</Text>
          </Link>
        </Text>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  socialButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 10,
  },
  socialButtonText: {
    color: "#333",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#333",
  },
  continueButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#002F5A",
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#002F5A",
    fontWeight: "bold",
  },
});

export default SignInScreen;

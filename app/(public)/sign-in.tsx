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
import Colors from "@/constants/Colors";

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
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          {/* Logowanie przez Github */}
          <TouchableOpacity
            style={[styles.socialButton, { marginLeft: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_github")}
          >
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
              <Text style={styles.link}> Sign up</Text>
            </Link>
          </Text>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "20%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
    marginBottom: 20,
    textAlign: "center",
  },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "15%",
  },
  socialButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "flex-start",
  },
  socialButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.background,
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  formContainer: {
    width: "100%",
    height: "55%",
    paddingVertical: 10
  },
  input: {
    width: "100%",
    borderWidth: 3,
    borderColor:  Colors.dark.tintDarkerGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: Colors.dark.text,
  },
  continueButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: Colors.dark.tintDarkerGreen,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color:  Colors.dark.text,
    fontSize: 14,
  },
  link: {
    color: Colors.dark.tintLightGreen,
    fontWeight: "bold",
  },
});

export default SignInScreen;

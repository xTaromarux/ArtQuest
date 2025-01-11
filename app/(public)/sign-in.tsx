import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import Container from "@/components/Container";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import styles from "@/constants/styles/screens/SignInScreen.styles";
import API_BASE_URL from "@/utils/config";
import { useRedirect } from "../_layout";
import { useAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";

const SignInScreen: React.FC = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isLoaded: isLoadedSignUp, signUp, setActive: setActiveSignUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const router = useRouter();
  const { setHasRedirected } = useRedirect();
  const { isSignedIn } = useAuth();
  const publishableGoogleKey = process.env.GOOGLE_CLIENT_ID!;
  const publishableGithubKey = process.env.GITHUB_CLIENT_ID!;

  if (!publishableGoogleKey) {
    throw new Error(
      "Missing Publishable Key. Please set GOOGLE_CLIENT_ID in your .env"
    );
  }

  if (!publishableGithubKey) {
    throw new Error(
      "Missing Publishable Key. Please set GITHUB_CLIENT_ID in your .env"
    );
  }

  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      setHasRedirected(false);

      console.log("Attempting to sign in");
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      console.log("Sign-in result:", completeSignIn);

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
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
    if (!isLoaded || !signIn) return;

    try {
      const redirectUrl = Linking.createURL("/oauth-callback");
      const completeUrl = Linking.createURL("/home");

      // Użycie tej samej funkcji dla mobilnych i webowych aplikacji
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl,
        redirectUrlComplete: completeUrl,
      });
    } catch (error: any) {
      Alert.alert(
        "Błąd",
        `Nie udało się zalogować przez ${provider === "oauth_google" ? "Google" : "GitHub"}.`
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { height: height }]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Container height={500} width={80}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>to continue to Getting Started</Text>
          <Text style={styles.subtitle}>Continue with</Text>
        </View>
        <View style={styles.socialButtonsContainer}>
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

          <TouchableOpacity
            style={[styles.socialButton, { marginLeft: 5 }]}
            onPress={() => handleOAuthSignIn("oauth_github")}
          >
            <Image
              source={require("@/assets/images/github.png")}
              style={styles.image}
            />
            <Text style={styles.socialButtonText}>GitHub</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.formContainer}>
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
            {"\n"}
            Forgot your password?
            <Link href="/reset" asChild>
              <Text style={styles.link}> Reset it here</Text>
            </Link>
          </Text>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
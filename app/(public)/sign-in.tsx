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
  Dimensions,
  Linking,
} from "react-native";
import Container from "@/components/Container";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import styles from "@/constants/styles/screens/SignInScreen.styles";
import API_BASE_URL from "@/utils/config";
import { useRedirect } from "../_layout";
import { useAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

const SignInScreen: React.FC = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const router = useRouter();
  const { setHasRedirected } = useRedirect();
  const { isSignedIn } = useAuth();

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

  const publishableClerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const publishableGoogleKey = process.env.GOOGLE_CLIENT_ID!;
  const publishableGithubKey = process.env.GITHUB_CLIENT_ID!;

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      // Generowanie dynamicznego redirect URI
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: "artquest",
        path: "oauth-callback",
        preferLocalhost: false,
      });
      console.log(redirectUri);
      
      // Discovery dokument z authorizationEndpoint
      const discovery = {
        authorizationEndpoint: `${API_BASE_URL}/login/${provider}`,
      };
      console.log(discovery);

      // Tworzenie żądania OAuth
      const request = new AuthSession.AuthRequest({
        clientId:
          provider === "google"
            ? publishableGoogleKey
            : publishableGithubKey,
        scopes: ["openid", "email", "profile"],
        redirectUri,
      });
      console.log(request);

      // Autoryzacja użytkownika
      const result = await request.promptAsync(discovery);
      console.log(result);
      console.log(result.type);

      if (result.type !== "error") {
        Alert.alert(
          "Błąd",
          `Nie udało się zalogować przez ${
            provider === "google" ? "Google" : "GitHub"
          }.`
        );
        return;
      }
  
      // Pobranie kodu autoryzacji
      const { code } = result.params;
  
      // Wywołanie backendu w celu pobrania danych użytkownika
      const response = await fetch(
        `${API_BASE_URL}/oauth-callback?provider=${provider}&code=${code}`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        Alert.alert("Błąd", "Nie udało się zweryfikować użytkownika.");
        return;
      }
  
      const userData = await response.json();
  
      const { email, given_name: firstName, name: username } = userData;
  
      // Sprawdzenie, czy użytkownik istnieje w Clerk
      const checkUserResponse = await fetch(
        `https://api.clerk.dev/v1/users?email_address=${email}`,
        {
          headers: {
            Authorization: `Bearer YOUR_CLERK_API_KEY`,
          },
        }
      );
  
      const existingUsers = await checkUserResponse.json();
  
      if (existingUsers.length > 0) {
        // Użytkownik istnieje, przekierowanie na stronę główną
        router.push("/");
      } else {
        // Tworzenie nowego użytkownika w Clerk
        const createUserResponse = await fetch(
          "https://api.clerk.dev/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: publishableClerkKey,
            },
            body: JSON.stringify({
              email_addresses: [{ email_address: email }],
              first_name: firstName,
              username,
            }),
          }
        );
  
        if (!createUserResponse.ok) {
          Alert.alert(
            "Błąd",
            "Nie udało się utworzyć konta użytkownika w Clerk."
          );
          return;
        }
  
        // Konto stworzone, przekierowanie na stronę /home
        router.push("/home");
      }
    } catch (error: any) {
      Alert.alert("Błąd", "Wystąpił problem podczas logowania.");
      console.error("OAuth Error:", error);
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
            onPress={() => handleOAuthSignIn("google")}
          >
            <Image
              source={require("@/assets/images/google.png")}
              style={styles.image}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, { marginLeft: 5 }]}
            onPress={() => handleOAuthSignIn("github")}
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

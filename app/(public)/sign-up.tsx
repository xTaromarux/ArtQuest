import React, { useEffect, useState } from "react";
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
} from "react-native";
import Container from "@/components/Container";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import styles from "@/constants/styles/screens/SignUpScreen.styles";
import API_BASE_URL from "@/utils/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import InputModal from "@/components/InputModal";

const SignUpScreen: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const [modalVisible, setModalVisible] = useState(false);

  // Stany dla błędów pól
  const [errors, setErrors] = useState({
    login: "",
    username: "",
    emailAddress: "",
    password: "",
  });

  const [verificationCodeError, setVerificationCodeError] = useState({
    label: "",
  });

  const newVerificationCodeError = {
    label: "",
  };

  const createUserOnBackend = async (
    login: string,
    user_name: string,
    mail: string
  ) => {
    try {
      const queryParams = new URLSearchParams({
        login,
        user_name,
        mail,
      }).toString();

      const response = await fetch(
        `${API_BASE_URL}/api/user/create?${queryParams}`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true", // Opcjonalne
            "User-Agent": "CustomAgent", // Opcjonalne
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user on backend.");
      }

      console.log("User created successfully on backend.");
    } catch (error: any) {
      console.error("Error creating user on backend:", error.message);
      Alert.alert("Error", "Failed to save user data. Please try again.");
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Walidacja e-mail
    const newErrors = {
      login: login.trim().length >= 3 ? "" : "Login: at least 3 chars",
      username: username ? "" : "Username is required",
      emailAddress: emailRegex.test(emailAddress)
        ? ""
        : "Enter a valid email address",
      password:
        password.length >= 8
          ? ""
          : "Password must be at least 8 characters long",
    };

    setErrors(newErrors);

    // Zwróć true, jeśli nie ma żadnych błędów
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSignUp = async () => {
    handleOpen();

    if (!isLoaded) return;

    if (!validateInputs()) return; // Walidacja pól wejściowych

    setLoading(true);
    try {
      // Utwórz konto
      await signUp.create({
        emailAddress,
        password,
        username: login,
      });

      // Weryfikacja użytkownika
      await signUp.prepareEmailAddressVerification();

      // Wyślij dane użytkownika na backend
      await createUserOnBackend(login, username, emailAddress);

      Alert.alert(
        "Verification",
        "Please check your email to confirm your registration."
      );
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.code === "form_identifier_exists") {
            setErrors((prev) => ({
              ...prev,
              emailAddress:
                err.message || "This email address is already taken.",
            }));
          }

          if (err.code === "form_password_pwned") {
            setErrors((prev) => ({
              ...prev,
              password:
                "This password is not secure. Please choose another one.",
            }));
          }
        });
      } else {
        Alert.alert("Błąd", "An error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (
    provider: "oauth_github" | "oauth_google"
  ) => {
    if (!signUp) return;

    try {
      const redirectUrl = "http://localhost:8081/oauth-callback"; // Callback URL
      const completeUrl = "http://localhost:8081/home"; // URL po zakończeniu

      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl,
        redirectUrlComplete: completeUrl,
      });
    } catch (error: any) {
      Alert.alert(
        "Error",
        `Failed to register via ${provider === "oauth_google" ? "Google" : "GitHub"}.`
      );
    }
  };

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleAccept = async (code: string) => {
    if (!signUp) return;

    setVerificationCodeError({ label: "" }); // Zresetuj błędy
    try {
      // Przekazanie kodu weryfikacyjnego do Clerk
      const response = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (response.status === "complete") {
        console.log("Verification successful!");
        setModalVisible(false);

        const completeUrl = "http://localhost:8081/home"; 
        router.replace(completeUrl);
      } else {
        throw new Error("Verification failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Verification error:", error.message);
      setVerificationCodeError({
        label: error.errors?.[0]?.long_message || "Invalid verification code.",
      });
    }
  };

  // Pobierz dane użytkownika po autoryzacji OAuth
  useEffect(() => {
    const checkUserAfterOAuth = async () => {
      try {
        if (signUp?.status === "complete") {
          const { createdSessionId, emailAddress, username } = signUp;

          if (username != null && emailAddress != null) {
            await createUserOnBackend(username, login, emailAddress);
          }
          // Wyślij dane na backend
        }
      } catch (error: any) {
        console.error("Error retrieving data after OAuth:", error.message);
      }
    };

    checkUserAfterOAuth();
  }, [signUp]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.screen, { height: height }]}
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
            <View style={{ flex: 1, marginRight: 5 }}>
              <TextInput
                style={[styles.tintInput]}
                placeholder="Login"
                value={login}
                onChangeText={(text) => {
                  setLogin(text);
                  setErrors({ ...errors, login: "" });
                }}
              />
              {errors.login ? (
                <Text style={styles.errorText}>{errors.login}</Text>
              ) : (
                <Text style={styles.errorText}> </Text>
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <TextInput
                style={[styles.tintInput]}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrors({ ...errors, username: "" });
                }}
              />
              {errors.username ? (
                <Text style={styles.errorText}>{errors.username}</Text>
              ) : (
                <Text style={styles.errorText}> </Text>
              )}
            </View>
          </View>
          <View style={styles.tintInputRow}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={emailAddress}
              onChangeText={(text) => {
                setEmailAddress(text);
                setErrors({ ...errors, emailAddress: "" });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.emailAddress ? (
              <Text style={styles.errorText}>{errors.emailAddress}</Text>
            ) : (
              <Text style={styles.errorText}> </Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: "" });
              }}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : (
              <Text style={styles.errorText}> </Text>
            )}

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
      <InputModal
        isVisible={modalVisible}
        onConfirm={(label: string) => handleAccept(label)}
        onCancel={handleCancel}
        title="Please check email and enter the verification code"
        IconComponent={AntDesign}
        iconName="exclamationcircleo"
        iconSize={40}
        iconColor={Colors.dark.background}
        acceptText="Create account"
        labelText="Verification code"
        error={verificationCodeError}
        setError={setVerificationCodeError}
      />
    </GestureHandlerRootView>
  );
};

export default SignUpScreen;

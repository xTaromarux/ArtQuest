import React, { useEffect, useRef, useState } from "react";
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
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import styles from "@/constants/styles/screens/SignUpScreen.styles";
import API_BASE_URL from "@/utils/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import InputModal from "@/components/InputModal";
import * as Linking from "expo-linking";
import useFetchCreateCourseState from "@/hooks/useFetchCreateCourseState";

const SignUpScreen: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const { signOut } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userCourse, setUserCourse] = useState<string>("");
  const [prevUserCourse, setPrevUserCourse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingAfterRegistration, setLoadingAfterRegistration] =
    useState(false);
  const { loading: courseLoading, error: courseError } =
    useFetchCreateCourseState(userCourse, "0", "1");

  const [errors, setErrors] = useState({
    login: "",
    username: "",
    emailAddress: "",
    password: "",
  });

  const [verificationCodeError, setVerificationCodeError] = useState({
    label: "",
  });

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
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user on backend.");
      }

      console.log("User created successfully on backend.");
      const responseData = await response.json();
      console.log(responseData);

      return responseData;
    } catch (error: any) {
      console.error("Error creating user on backend:", error.message);
      Alert.alert("Error", "Failed to save user data. Please try again.");
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) return;

    if (!validateInputs()) return;

    handleOpen();

    setLoading(true);
    try {
      const signUpResult = await signUp.create({
        emailAddress,
        password,
        username: login,
      });

      const userId = signUpResult.id;
      console.log(signUpResult);
      console.log(userId);

      await signUp.prepareEmailAddressVerification();
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
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      console.log("Redirected URL:", event.url);
      // Obsłuż URL, np. wyodrębnij kod autoryzacji lub token
    };

    const subscription = Linking.addEventListener("url", handleUrl);

    return () => {
      // Usuń nasłuchiwacz
      subscription.remove();
    };
  }, []);

  const handleOAuthSignIn = async (
    provider: "oauth_github" | "oauth_google"
  ) => {
    if (!signUp) return;

    try {
      const redirectUrl = Linking.createURL("oauth-callback");
      let authUrl = "";

      if (provider === "oauth_google") {
        authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(
          redirectUrl
        )}&response_type=code&scope=profile email`;
      } else if (provider === "oauth_github") {
        authUrl = `https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=${encodeURIComponent(
          redirectUrl
        )}&scope=user:email`;
      }

      console.log("Redirect URL:", redirectUrl);
      console.log("Auth URL:", authUrl);

      // Otwórz URL w przeglądarce
      await Linking.openURL(authUrl);
    } catch (error: any) {
      console.error("OAuth Error:", error);
      Alert.alert(
        "Error",
        `Failed to sign in with ${
          {
            oauth_google: "Google",
            oauth_github: "GitHub",
          }[provider]
        }. Please try again.`
      );
    }
  };

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const createUserCourse = async (userId: string) => {
    try {
      const data = {
        course_id: "44c92ac4-ced2-41c5-ac20-46ca8bbe0745",
        user_id: userId,
      };
      const formBody = new URLSearchParams(data).toString();

      const response = await fetch(`${API_BASE_URL}/api/user-course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to save user's course. Please try again.");
      }
      let userCourseTemo = await response.json();

      console.log(userCourseTemo);

      setUserCourse(userCourseTemo.id);
    } catch (error) {
      console.error(error);
    }
  };

  const createUserStats = async (userId: string) => {
    const now = new Date();
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(6, "0")}`;

    try {
      const data = {
        experience: "0",
        level: "0",
        courses: "0",
        start_strike: currentDate,
        end_strike: currentDate,
        user_id: userId,
      };

      const formBody = new URLSearchParams(data).toString();

      const response = await fetch(`${API_BASE_URL}/api/statistics/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      if (!response.ok) {
        console.error("Server response:", await response.text());
        throw new Error("Failed to save user's stats. Please try again.");
      }

      console.log("User stats created successfully.");
    } catch (error) {
      console.error("Error creating user stats:", error);
    }
  };

  const handleAccept = async (code: string) => {
    if (!signUp) return;

    setVerificationCodeError({ label: "" });
    try {
      const response = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log(response);

      if (response.status === "complete") {
        console.log("Verification successful!");
        setModalVisible(false);

        let user = await createUserOnBackend(login, username, emailAddress!);
        console.log(user);

        if (user?.id) {
          setLoadingAfterRegistration(true); // Ustaw flagę przed operacjami

          await createUserStats(user.id);
          await createUserCourse(user.id);

          setLoadingAfterRegistration(false); // Flaga po zakończeniu
          // const completeUrl = Linking.createURL("home");
          // router.replace(completeUrl);
          await setActive({ session: response.createdSessionId });
        } else {
          throw new Error("User ID is not available.");
        }
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

  useEffect(() => {
    const checkUserAfterOAuth = async () => {
      try {
        if (signUp?.status === "complete") {
          const { emailAddress, username } = signUp;

          if (username && emailAddress) {
            await createUserOnBackend(username, login, emailAddress);
          }
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
        <Container height={550} width={80}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create your account</Text>
          </View>
          <View style={styles.subtitleContainer}>
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
              <Text style={styles.socialButtonText}>Github</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.line} />
          </View>

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

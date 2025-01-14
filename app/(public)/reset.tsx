import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Container from "@/components/Container";
import { Link } from "expo-router";
import styles from "@/constants/styles/screens/ResetScreen.styles";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const height = Dimensions.get('screen').height;

  // Request a password reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      alert("Password reset successfully");

      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, {height: height}]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Container height={350} width={80}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Reset password</Text>
        </View>
        <View style={styles.formContainer}>
          <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

          {!successfulCreation && (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Email address"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  style={styles.input}
                />
              </View>
            </>
          )}

          {successfulCreation && (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  style={styles.input}
                  onChangeText={setCode}
                />
                <TextInput
                  placeholder="New password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
              </View>
            </>
          )}

          {!successfulCreation && (
            <>
              <TouchableOpacity style={styles.button} onPress={onRequestReset}>
                <Text style={styles.buttonText}>Send Reset Email</Text>
              </TouchableOpacity>
            </>
          )}

          {successfulCreation && (
            <>
              <TouchableOpacity style={styles.button} onPress={onReset}>
                <Text style={styles.buttonText}>Set new Password</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.footerText}>
            Remembered your password? {"\n"}
            <Link href="/sign-in" asChild>
              <Text style={styles.link}>Go back to the login page.</Text>
            </Link>
          </Text>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default PwReset;

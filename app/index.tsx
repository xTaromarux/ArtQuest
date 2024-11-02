import Container from "@/components/Container";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.screen}>
      <Container height={300}>
        <Text style={styles.title}>ArtQuest</Text>
        <Text style={styles.subtitle}>
          Twój Kreatywny Rozwój na Wyciągnięcie Ręki
        </Text>
        <Text style={styles.description}>
          Rozwijaj swoją kreatywność z pomocą AI
        </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity style={styles.buttonSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.buttonSignIn}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </Link>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#002F5A",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonSignUp: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonSignIn: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#002F5A",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MainScreen;

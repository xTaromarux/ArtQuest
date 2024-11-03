import Container from "@/components/Container";
import styles from "@/constants/styles/MainScreen.styles";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.screen}>
      <Container height={600}>
        <View style={styles.contentContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.image}
          />
          <Text style={styles.title}>ArtQuest</Text>
          <Text style={styles.subtitle}>
            Your Creative Development at Your Fingertips
          </Text>
          <Text style={styles.description}>
            Develop your creativity with the help of AI
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Link href="/sign-up" asChild>
            <TouchableOpacity style={styles.buttonSignUp}>
              <Text style={styles.buttonTextDark}>Sign up</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.buttonSignIn}>
              <Text style={styles.buttonTextLight}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Container>
    </View>
  );
};

export default MainScreen;
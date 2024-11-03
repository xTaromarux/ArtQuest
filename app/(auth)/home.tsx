import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";
import { useUser } from "@clerk/clerk-expo";
import Line from "@/components/Line";
import Container from "@/components/Container";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import styles from "@/constants/styles/screens/HomeScreen.styles";

const HomeScreen: React.FC = () => {
  const { user } = useUser(); // Pobieramy dane użytkownika

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.username || "User"}!</Text>
      <Line width={100} style={{ marginVertical: 20 }} />
      <Text style={styles.subtitle}>Pick up where you left off</Text>

      <Container
        height={400}
        width={100}
        style={{ marginVertical: 30, padding: 0, justifyContent: "flex-start" }}
      >
        <ImageBackground
          source={{ uri: "../../assets/images/background_course_home.png" }} // URI obrazu tła
          style={[styles.courseImageContainer, { width: `100%` }]}
          imageStyle={{ resizeMode: "cover", borderRadius: 10 }} // Opcjonalne dopasowanie obrazu
        >
          <Image
            source={require("@/assets/images/Shapes.png")} // Ikona kursu
            style={styles.courseImage}
            resizeMode="contain"
          />
        </ImageBackground>
        <Line width={90} backgroundColor={Colors.dark.text} />
        <View style={styles.courseContentContainer}>
          <View style={styles.courseInfo}>
            <Text style={styles.levelText}>Level 1</Text>
            <Text style={styles.courseTitle}>Basic Shapes</Text>
            <ProgressBar progress={0.4} color={Colors.dark.tintLighterGreen} /> {/* 60% postępu */}
          </View>
          <Pressable style={styles.continueButton}>
            <Link href="/(auth)/exercise">
              <Text style={styles.continueButtonText}>Continue</Text>
            </Link>
          </Pressable>
        </View>
      </Container>

      <Pressable style={styles.inspirationButton}>
        <Link href="/(auth)/feed/">
          <Text style={styles.inspirationButtonText}>Look for inspiration</Text>
          <MaterialCommunityIcons
            style={styles.inspirationIcon}
            name="clipboard-text-multiple-outline"
            size={24}
            color={Colors.dark.text}
          />
        </Link>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
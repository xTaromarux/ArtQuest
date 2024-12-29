import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";
import { useUser } from "@clerk/clerk-expo";
import Line from "@/components/Line";
import Container from "@/components/Container";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";
import styles from "@/constants/styles/screens/HomeScreen.styles";
import useFetchUserId from "@/hooks/useFetchUserId";
import useFetchCourseDetails from "@/hooks/useFetchCourseDetails";
import CustomImage from "@/components/CustomImage";

const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const height = Dimensions.get("screen").height;

  const { userId, loading: userLoading, error: userError } = useFetchUserId();
  const { course, loading, error } = useFetchCourseDetails(userId);

  if (userLoading || loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (userError || error) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Error: {userError || error}</Text>
      </View>
    );
  }if (userLoading || loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (userError || error) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Error: {userError || error}</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>No course found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { height: height }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Text style={styles.greeting}>Hello, {user?.username || "User"}!</Text>
      <Line width={100} style={{ marginVertical: 20 }} />
      <Text style={styles.subtitle}>Pick up where you left off</Text>

      <Container
        height={470}
        width={100}
        style={{ marginVertical: 30, padding: 0, justifyContent: "flex-start" }}
      >
        <ImageBackground
          source={require("@/assets/images/background_course_home.png")}
          style={[styles.courseImageContainer, { width: `100%` }]}
          imageStyle={{ resizeMode: "cover", borderRadius: 10 }}
        >
          <CustomImage
            url={course.picture_url}
            style={styles.courseImage}
            resizeMode="contain"
          />
        </ImageBackground>
        <Line width={90} backgroundColor={Colors.dark.text} />
        <View style={styles.courseContentContainer}>
          <View style={styles.courseInfo}>
            <Text style={styles.levelText}>Level {course.difficulty.level || 1}</Text>
            <Text style={styles.courseTitle}>{course.course.title || "Course Title"}</Text>
            <ProgressBar progress={course.stage || 0} color={Colors.dark.tintLighterGreen} />
          </View>
          <Pressable
            onPress={() => {
              router.push("/exercises");
            }}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
      </Container>

      <Link href="/(auth)/feed" asChild>
        <Pressable style={styles.inspirationButton}>
          <Text style={styles.inspirationButtonText}>Look for inspiration</Text>
          <MaterialCommunityIcons
            style={styles.inspirationIcon}
            name="clipboard-text-multiple-outline"
            size={24}
            color={Colors.dark.text}
          />
        </Pressable>
      </Link>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

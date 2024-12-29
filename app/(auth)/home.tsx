import React, { useEffect, useState } from "react";
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
import { useUser, useAuth } from "@clerk/clerk-expo";
import Line from "@/components/Line";
import Container from "@/components/Container";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";
import styles from "@/constants/styles/screens/HomeScreen.styles";
import API_BASE_URL from "@/utils/config";
import CustomImage from "@/components/CustomImage";

const HomeScreen: React.FC = () => {
  const {user} = useUser();
  const height = Dimensions.get("screen").height;

  const [course, setCourse] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        console.log(user?.emailAddresses[0].emailAddress);
        
        const userIdResponse = await fetch(
          `${API_BASE_URL}/api/users/get-id-by-email?email=${user?.emailAddresses[0].emailAddress}`, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        
        if (!userIdResponse.ok) {
          throw new Error("Failed to fetch user_id");
        }
        const userIdData = await userIdResponse.json();     
        console.log(userIdData);
         
        const userId = userIdData?.id;
        if (!userId) {
          throw new Error("No user_id found in response");
        }

        setUserId(userId);
      } catch (error) {
        console.error("Error fetching userId details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {

      console.log("userId");
      console.log(userId);
      
      try {
        const coursesResponse = await fetch(
          `${API_BASE_URL}/api/courses/${userId}`, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();
        console.log(coursesData);

        const CourseId = coursesData[0]?.course_id;
        if (!CourseId) {
          throw new Error("No user_course_id found in response");
        }
        

        const courseDetailsResponse = await fetch(
          `${API_BASE_URL}/api/course_details/${CourseId}`, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        if (!courseDetailsResponse.ok) {
          throw new Error("Failed to fetch course details");
        }
        const courseDetails = await courseDetailsResponse.json();
        console.log(courseDetails);
        
        // Zapisanie szczegółów kursu
        setCourse(courseDetails);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [userId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading course details...</Text>
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
            <ProgressBar progress={course.progress || 0} color={Colors.dark.tintLighterGreen} />
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

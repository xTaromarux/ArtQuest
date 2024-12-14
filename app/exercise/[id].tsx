import React, { useState, useEffect } from "react";
import { Link, router, useGlobalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import Container from "@/components/Container";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Exercise } from "@/utils/types";
import { renderTemplate } from "@/components/TweetScreen";
import * as ImagePicker from "expo-image-picker";
import API_BASE_URL from "@/utils/config";

export default function TweetScreen() {
  const view = [
    {
      id: "1",
      template: 1,
      next_view_id: "2",
      previous_view_id: null,
      ai_part: false,
      percentage: 0.2,
      description: [
        "Lorem ipsum dolor sit amet, consectetur ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nunc id.",
      ],
      picture: [
        require("@/assets/images/LessonNo1_No1.png"),
        require("@/assets/images/LessonNo1_No2.png"),
        require("@/assets/images/LessonNo1_No3.png"),
        require("@/assets/images/LessonNo1_No4.png"),
        require("@/assets/images/LessonNo1_No5.png"),
      ],
    },
    {
      id: "2",
      template: 2,
      next_view_id: "3",
      previous_view_id: "1",
      ai_part: false,
      percentage: 0.4,
      description: [
        "Lorem ipsum dolor sit amet, consectetur ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nunc id.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nunc id.",
      ],
      picture: [
        require("@/assets/images/LessonNo2_No1.png"),
        require("@/assets/images/LessonNo2_No2.png"),
      ],
    },
    {
      id: "3",
      template: 3,
      next_view_id: "4",
      previous_view_id: "2",
      ai_part: true,
      percentage: 0.6,
      description: [
        "Lorem ipsum dolor sit amet, consectetur ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nunc id.",
      ],
      picture: [require("@/assets/images/LessonNo3_No1.png")],
    },
    {
      id: "4",
      template: 4,
      next_view_id: "end",
      previous_view_id: "3",
      ai_part: false,
      percentage: 0.8,
      description: [
        "Lorem ipsum dolor sit amet, consectetur ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      ],
      picture: [
        require("@/assets/images/LessonNo4_No1.png"),
        require("@/assets/images/LessonNo4_No2.png"),
      ],
    },
    {
      id: "end",
      template: 5,
      next_view_id: null,
      previous_view_id: null,
      ai_part: false,
      percentage: 1,
      description: [
        "Congratulations!",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      ],
      picture: [require("@/assets/images/EndLesson.png")],
    },
  ];

  const { id, sendPicture, exercise } = useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;
  const height = Dimensions.get("screen").height;

  const [image, setImage] = useState<string | null>(null);
  const [aiDescription, setAiDescription] = useState<string>("Error");

  const uploadImage = async (userId: string, exerciseId: string, imageUri: string) => {
    const formData = new FormData();
  
    // Pobranie obrazu jako Blob
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    // Dodanie danych do FormData
    formData.append("user_id", userId);
    formData.append("exercise_id", exerciseId);
    formData.append("feedback_image", blob, "feedback_image.jpg");
  
    try {
      const uploadResponse = await fetch(`${API_BASE_URL}/api/feedback/`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "CustomAgent",
        },
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || "Upload failed");
      }
  
      Alert.alert("Success", "Image uploaded successfully!");
  
      // Pobierz szczegóły z feedback_details
      const feedbackDetails = await fetchFeedbackDetails(exerciseId, userId);
  
      // Zwróć dane, aby użyć ich w handlePress
      return feedbackDetails.message || "No feedback provided";
    } catch (error: any) {
      console.error("Error during upload:", error.message || error);
      Alert.alert("Error", error.message || "Failed to upload image");
      return "Error fetching feedback details"; // Zwróć wartość domyślną w przypadku błędu
    }
  };
  
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const fetchFeedbackDetails = async (exerciseId: string, userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback_details/${exerciseId}/${userId}`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "CustomAgent",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch feedback details");
      }
  
      const data = await response.json();
      console.log("Feedback Details:", data);
      return data; // Zwróć dane, aby można było je dalej wykorzystać
    } catch (error: any) {
      console.error("Error fetching feedback details:", error.message || error);
      return { message: "Error fetching feedback details" }; // Zwrot błędu w przypadku problemów
    }
  };  
  
  const handlePress = async (exercise: Exercise, next: boolean) => {
    let viewTmp: Exercise = view.find(
      (item) =>
        item.id === (next ? exercise.next_view_id : exercise.previous_view_id)
    )!;
  
    let sendPicture = "false";
    if (image) {
      viewTmp.picture[1] = image;
      sendPicture = "true";
  
      // Wywołanie uploadImage i przypisanie wiadomości do aiDescription
      const feedbackMessage = await uploadImage(
        "e65cad91-1dfd-4469-abfc-3f3b65ca4efb",
        "de610de9-45e1-4a12-9a38-657703dd4773",
        image
      );
  
      setAiDescription(feedbackMessage); // Aktualizuj stan
      viewTmp.description[1] = feedbackMessage; // Przypisz wiadomość do description
    }
  
    router.push({
      pathname: `../../exercise/[id]`,
      params: {
        id: viewTmp.id,
        sendPicture: sendPicture,
        exercise: JSON.stringify(viewTmp),
      },
    });
  };
  
  
  return (
    <KeyboardAvoidingView
      style={[styles.screen, { height: height }]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Container height={780} width={90}>
        <View style={styles.header}>
          <View style={styles.courseInfoContainer}>
            <ProgressBar
              progress={exerciseData.percentage}
              color={Colors.dark.tintLighterGreen}
            />
          </View>
          <View style={styles.exitButtonContainer}>
            <Link href="/exercises" asChild>
              <Pressable>
                <Feather name="x" size={24} color="black" />
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.mainContainer}>
            {exerciseData &&
              renderTemplate(exerciseData.template, exerciseData, exerciseData.ai_part ? pickImage : null)}
          </View>
          <View style={styles.leftArrowContainer}>
            {exerciseData.previous_view_id ? (
              <Pressable onPress={() => handlePress(exerciseData, false)}>
                <EvilIcons name="arrow-left" size={60} color="black" />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.rightArrowContainer}>
            {exerciseData.next_view_id ? (
              <Pressable onPress={() => handlePress(exerciseData, true)}>
                <EvilIcons name="arrow-right" size={60} color="black" />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "5%",
  },

  courseInfoContainer: {
    width: "85%",
    paddingTop: 8,
  },

  exitButtonContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },

  viewContainer: {
    width: "100%",
    height: "95%",
    justifyContent: "flex-start",
  },

  mainContainer: {
    width: "100%",
    height: "100%",
  },

  leftArrowContainer: {
    position: "absolute",
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },

  rightArrowContainer: {
    position: "absolute",
    left: "85%",
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
});

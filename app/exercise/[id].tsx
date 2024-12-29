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
import useFetchView from "@/hooks/useFetchView";
import useFetchUserId from "@/hooks/useFetchUserId";

export default function TweetScreen() {
  const { id, index, exercise } = useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const { userId, loading: userLoading, error: userError } = useFetchUserId();
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;
  const height = Dimensions.get("screen").height;
  const [exerciseId, setExerciseId] = useState<string | null>(null);
  const [stage, setStage] = useState(Number(index));
  const [next, setNext] = useState(Boolean);
  const {
    view,
    loading: viewLoading,
    error: viewError,
  } = useFetchView(exerciseId, stage);

  
  useEffect(() => {
    const setExercise = async () => {
      if(!view) return

      let sendPicture = "false";
      if (image) {
        view.picture_urls[1].url = image;
        sendPicture = "true";
  
        // Wywołanie uploadImage i przypisanie wiadomości do aiDescription
        const feedbackMessage = await uploadImage(userId!, exerciseData.id, image);
  
        setAiDescription(feedbackMessage);
        view.short_descriptions[1] = feedbackMessage;
      }
  
      router.push({
        pathname: `../../exercise/[id]`,
        params: {
          id: view.id,
          index: next ? stage + 1 : stage - 1,
          sendPicture: sendPicture,
          exercise: JSON.stringify(view),
        },
      });
    };

    setExercise();
  }, [view]);

  const [image, setImage] = useState<string | null>(null);
  const [aiDescription, setAiDescription] = useState<string>("Error");

  const uploadImage = async (
    userId: string,
    exerciseId: string,
    imageUri: string
  ) => {
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
      const response = await fetch(
        `${API_BASE_URL}/api/feedback_details/${exerciseId}/${userId}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch feedback details"
        );
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
    setNext(next)
    setExerciseId(next ? exercise.next_view_id : exercise.previous_view_id)
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
              renderTemplate(
                exerciseData.template,
                exerciseData,
                exerciseData.ai_part ? pickImage : null
              )}
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

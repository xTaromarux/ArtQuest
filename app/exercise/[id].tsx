import React, { useState, useEffect, startTransition } from "react";
import { Link, router, useGlobalSearchParams, useRouter } from "expo-router";
import {
  View,
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
import useFetchViewById from "@/hooks/useFetchViewById";
import useFetchUserId from "@/hooks/useFetchUserId";
import styles from "@/constants/styles/screens/ExerciseDetails.styles";

export default function ExerciseDetails() {
  const { id, index, exercise, exerciseId, userCourseId } =
    useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const { userId, loading: userLoading, error: userError } = useFetchUserId();
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;
  const height = Dimensions.get("screen").height;
  const [viewId, setViewId] = useState<string | null>(null);
  const [stage, setStage] = useState(Number(index));
  const [next, setNext] = useState(Boolean);
  const {
    view,
    loading: viewLoading,
    error: viewError,
  } = useFetchViewById(viewId, stage);

  useEffect(() => {
    const setExercise = async () => {
      if (!view) return;

      let sendPicture = "false";
      if (image) {
        view.picture_urls[1].url = image;
        sendPicture = "true";

        // Wywołanie uploadImage i przypisanie wiadomości do aiDescription
        const feedbackMessage = await uploadImage(
          userId!,
          exerciseId as string,
          image
        );

        view.short_descriptions[1] = feedbackMessage;
      }

      startTransition(() => {
        setStage(next ? stage + 2 : stage - 2);
      });
      view.percentage = stage;

      router.push({
        pathname: `../../exercise/[id]`,
        params: {
          id: view.id,
          index: next ? stage + 2 : stage - 2,
          exercise: JSON.stringify(view),
          exerciseId: exerciseId,
          userCourseId: userCourseId,
        },
      });
    };

    setExercise();
  }, [view]);

  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async (
    userId: string,
    exerciseId: string,
    imageUri: string
  ) => {
    const formData = new FormData();

    const response = await fetch(imageUri);

    formData.append("user_id", userId);
    formData.append("exercise_id", exerciseId);

    if (imageUri) {
      const filename = imageUri.split("/").pop();
      const type = `image/jpg`;
      formData.append("feedback_image", {
        uri: imageUri,
        name: filename,
        type,
      } as any);
    }

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

      const feedbackDetails = await fetchFeedbackDetails(exerciseId, userId);

      return feedbackDetails.message || "No feedback provided";
    } catch (error: any) {
      console.error("Error during upload:", error.message || error);
      return "Error fetching feedback details";
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
      return data; // Zwróć dane, aby można było je dalej wykorzystać
    } catch (error: any) {
      console.error("Error fetching feedback details:", error.message || error);
      return { message: "Error fetching feedback details" }; // Zwrot błędu w przypadku problemów
    }
  };

  useEffect(() => {
    editCourseState(stage);
  }, [stage, index]);

  const editCourseState = async (stage: number) => {
    try {
      if (!userCourseId) return;

      const response = await fetch(
        `${API_BASE_URL}/api/progresses/${userCourseId}/edit_stage?stage=${String(stage)}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to save course progress. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = async (exercise: Exercise, next: boolean) => {
    await setNext(next);
    await setViewId(next ? exercise.next_view_id : exercise.previous_view_id);
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
              progress={stage / 10}
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

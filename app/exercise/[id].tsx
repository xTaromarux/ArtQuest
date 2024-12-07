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
} from "react-native";
import Container from "@/components/Container";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Exercise } from "@/utils/types";
import { renderTemplate } from "@/components/TweetScreen";

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

  const { id, exercise } = useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;
  const height = Dimensions.get("screen").height;

  const handlePress = (exercise: Exercise, next: boolean) => {
    let viewTmp: Exercise = view.find(
      (item) =>
        item.id === (next ? exercise.next_view_id : exercise.previous_view_id)
    )!;

    router.push({
      pathname: `../../exercise/[id]`,
      params: {
        id: viewTmp.id,
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
              renderTemplate(exerciseData.template, exerciseData)}
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

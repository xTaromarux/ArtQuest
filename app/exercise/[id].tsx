import React, { useState, useEffect } from "react";
import { Link, useGlobalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
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

export default function TweetScreen() {
  const { id, exercise } = useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;
  const height = Dimensions.get("screen").height;

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
            <ProgressBar progress={0.6} color={Colors.dark.tintLighterGreen} />
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
          <View style={styles.mainContainer}></View>
          <View style={styles.leftArrowContainer}>
            {exerciseData.previous_view_id ? (
              <EvilIcons name="arrow-left" size={60} color="black" />
            ) : (
              <></>
            )}
          </View>
          <View style={styles.rightArrowContainer}>
          {exerciseData.next_view_id ? (
            <EvilIcons name="arrow-right" size={60} color="black" />
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

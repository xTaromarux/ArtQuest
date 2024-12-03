import React, { useState, useEffect } from "react";
import { Link, useGlobalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";

export default function TweetScreen() {
  const { id, exercise } = useGlobalSearchParams();
  const exerciseString = Array.isArray(exercise) ? exercise[0] : exercise;
  const exerciseData = exerciseString ? JSON.parse(exerciseString) : null;


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  page: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },

});

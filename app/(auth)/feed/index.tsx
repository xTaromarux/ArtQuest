import React, { useState, useCallback, useEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import styles from "@/constants/styles/screens/FeedScreen.styles";
import Tweet from "@/components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { TweetType } from "@/utils/types";
import API_BASE_URL from "@/utils/config";

const ExerciseScreen: React.FC = () => {
  const height = Dimensions.get("screen").height;

  const [tweets, setTweets] = useState<TweetType[]>([]); // Ustawienie typu
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTweets = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "CustomAgent",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setTweets(data);
      } else {
        throw new Error("Expected JSON response but got something else.");
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setError("Failed to load tweets. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const loadTweets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        });
        const text = await response.text(); // Zwraca odpowiedź jako tekst
        console.log("Response text:", text);

        if (!response.ok) {
          throw new Error(`Failed to fetch tweets: ${response.statusText}`);
        }

        const data = JSON.parse(text); // Parsuj ręcznie tylko poprawny JSON
        setTweets(data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
        setError("Failed to load tweets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTweets();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.dark.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={fetchTweets}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { height }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled={Platform.OS === "ios"}
    >
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} onDelete={fetchTweets} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTweets} />
        }
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <Link
        href={{
          pathname: "/new-post",
          params: { refreshKey: new Date().toISOString() },
        }}
        asChild
      >
        <View style={styles.floatingButton}>
          <Entypo name="plus" size={40} color={Colors.dark.text} />
        </View>
      </Link>
    </KeyboardAvoidingView>
  );
};

export default ExerciseScreen;

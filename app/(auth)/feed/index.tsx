import React, { useState, useCallback } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import styles from "@/constants/styles/screens/FeedScreen.styles";
import Tweet from "@/components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import Line from "@/components/Line";
import { TweetType, UserType } from "@/utils/types";
import Colors from "@/constants/Colors";

const ExerciseScreen: React.FC = () => {
  const height = Dimensions.get("screen").height;
  const [refreshing, setRefreshing] = useState(false);

  // Static users
  const user1: UserType = {
    id: "1",
    login: "User1",
    name: "John Doe",
    avatar_url:
      "https://i.pinimg.com/736x/58/94/8d/58948d9dace5f470e60149bffbe17841.jpg",
  };

  const user2: UserType = {
    id: "2",
    login: "User2",
    name: "Jane Smith",
    avatar_url:
      "https://i.pinimg.com/736x/75/9d/0c/759d0c791c0f36599ebe489fc9010c7d.jpg",
  };

  // Static tweets data
  const tweets: TweetType[] = [
    {
      id: "1",
      description: "This is a static tweet 1",
      user: user1,
      createdAt: new Date().toISOString(),
      image_url:
        "https://i.pinimg.com/736x/51/2e/df/512edf4a5517ef22e7bb34de6c8b2c4c.jpg",
      numberOfComments: 5,
      numberOfRetweets: 10,
      numberOfLikes: 20,
      impressions: 100,
    },
    {
      id: "2",
      description: "Another tweet example",
      user: user2,
      createdAt: new Date().toISOString(),
      image_url:
        "https://i.pinimg.com/736x/54/c5/88/54c588122b4e0ecf28badb5fd0b3012b.jpg",
      numberOfComments: 3,
      numberOfRetweets: 6,
      numberOfLikes: 15,
      impressions: 80,
    },
    {
      id: "3",
      description: "Another tweet example",
      user: user2,
      createdAt: new Date().toISOString(),
      image_url:
        "https://i.pinimg.com/736x/54/c5/88/54c588122b4e0ecf28badb5fd0b3012b.jpg",
      numberOfComments: 3,
      numberOfRetweets: 6,
      numberOfLikes: 15,
      impressions: 80,
    },
  ];

  const fetchTweets = useCallback(() => {
    // Since we're using static data, just use a dummy function to simulate refresh
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulates a short loading time
  }, []);

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
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTweets} />
        }
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <Link
        href={
          {
            pathname: "/new-post",
            params: { onPostAdded: fetchTweets },
          } as never
        }
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

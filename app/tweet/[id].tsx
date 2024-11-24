import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import Tweet from "@/components/Tweet";
import { TweetType, UserType } from "@/utils/types";
import Post from "@/components/Post";
import AntDesign from '@expo/vector-icons/AntDesign';

function setRefreshing(arg0: boolean): void {
  throw new Error("Function not implemented.");
}


const TweetDetails: React.FC = () => {
  const { id, post } = useLocalSearchParams(); // Pobierz ID posta z parametrów URL
  const height = Dimensions.get("screen").height;
  const [tweet, setTweet] = useState<TweetType>({
    id: '',
    description: '',
    user: {
      id: '',
      login: '',
      name: '',
      avatar_url: ''
    },
    createdAt: '',
    image_url: '',
    numberOfComments: 0,
    numberOfRetweets: 0,
    numberOfLikes: 0,
    impressions: 0,
  });

  useEffect(() => {
    if (typeof post === "string") {
      try {
        const parsedPost = JSON.parse(post);

        const user: UserType = {
          id: parsedPost.user.id,
          login: parsedPost.user.login,
          name: parsedPost.user.name,
          avatar_url: parsedPost.user.avatar_url,
        };

        const tweetData: TweetType = {
          id: parsedPost.id,
          description: parsedPost.description,
          user: user, 
          createdAt: parsedPost.createdAt,
          image_url: parsedPost.image_url,
          numberOfComments: parsedPost.numberOfComments,
          numberOfRetweets: parsedPost.numberOfRetweets,
          numberOfLikes: parsedPost.numberOfLikes,
          impressions: parsedPost.impressions,
        };

        setTweet(tweetData); 
      } catch (error) {
        console.error("Błąd parsowania JSON:", error);
      }
    } else {
      console.error("Oczekiwano ciągu znaków, ale otrzymano:", post);
    }
  }, [post]); 

  const fetchTweets = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulates a short loading time
  }, []);

  const comments = [
    { id: "1", user: "User1", content: "Great post!" },
    { id: "2", user: "User2", content: "I agree!" },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { height }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled={Platform.OS === "ios"}
    >
      <View style={styles.header}>
            <Link href="/feed" asChild>
              <Pressable>
              <AntDesign name="arrowleft" size={24} color={Colors.light.background} />              
              </Pressable>
            </Link>
          </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentUser}>{item.user}</Text>
            <Text style={styles.commentContent}>{item.content}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Post tweet={tweet} onDelete={fetchTweets} />
        )}
      />
      <TextInput style={styles.input} placeholder="Add a comment..." />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
  },
  floatingButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    width: 70,
    height: 70,
    position: "absolute",
    right: 20,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.dark.background,
    overflow: "hidden",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  header: {
    marginBottom: 20,
  },
  tweetContent: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: "bold",
    color: Colors.light.text,
  },
  commentContent: {
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: Colors.dark.text,
  },
});

export default TweetDetails;
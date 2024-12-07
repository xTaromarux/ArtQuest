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
  Image,
  Pressable,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { TweetType, UserType } from "@/utils/types";
import Post from "@/components/Post";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Line from "@/components/Line";

function setRefreshing(arg0: boolean): void {
  throw new Error("Function not implemented.");
}

const TweetDetails: React.FC = () => {
  const { id, post } = useLocalSearchParams(); // Pobierz ID posta z parametrów URL
  const height = Dimensions.get("screen").height;
  const [tweet, setTweet] = useState<TweetType>({
    id: "",
    description: "",
    user: {
      id: "",
      login: "",
      name: "",
      avatar_url: "",
    },
    createdAt: "",
    image_url: "",
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
    { id: "1", name: "User1", login: "User1", content: "Great post!" },
    { id: "2", name: "User2", login: "User1", content: "I agree!" },
    { id: "3", name: "User2", login: "User1", content: "I agree!" },
    { id: "4", name: "User2", login: "User1", content: "I agree!" },
    { id: "5", name: "User2", login: "User1", content: "I agree!" },
    { id: "6", name: "User2", login: "User1", content: "I agree!" },
    {
      id: "7",
      name: "User2",
      login: "User1",
      content:
        "I agree22222sssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss!",
    },
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
            <AntDesign
              name="arrowleft"
              size={24}
              color={Colors.light.background}
            />
          </Pressable>
        </Link>
      </View>
      <FlatList
        style={{ paddingBottom: 20, marginBottom: 10 }}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.userImageContainer}>
                <Image
                  source={require("@/assets/images/avatar_default.png")}
                  style={styles.userImage}
                />
              </View>
            </View>
            <View style={styles.commetnDetailsCOntainer}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={{ color: Colors.light.text }}>•</Text>
                <Text style={styles.username}>@{item.login}</Text>
              </View>
              <View style={styles.commetnConteiner}>
                <Text style={styles.commentContent}>{item.content}</Text>
              </View>
              <Line
                width={100}
                backgroundColor={Colors.light.background}
                style={{ height: 1, marginTop: 15, opacity: 0.2 }}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <Post tweet={tweet} onDelete={fetchTweets} />
        )}
      />
      <View style={styles.newCommentContainer}>
        <TextInput style={styles.input} placeholder="Add a comment..." />
        <Pressable style={styles.floatingButton}>
          <Feather name="send" size={24} color={Colors.dark.background} />
        </Pressable>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  commetnDetailsCOntainer: {
    flexDirection: "column",
    width: "80%"
  },
  userInfo: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "bold",
    marginRight: 10,
  },
  username: {
    color: "gray",
    marginLeft: 10,
  },
  commetnConteiner: {
    width: "100%",
  },
  commentContent: {
    color: Colors.light.text,
  },
  newCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    backgroundColor: Colors.light.background,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    color: Colors.dark.text,
  },
  floatingButton: {
    height: 40,
    backgroundColor: Colors.light.background,
    borderEndEndRadius: 10,
    borderStartEndRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TweetDetails;

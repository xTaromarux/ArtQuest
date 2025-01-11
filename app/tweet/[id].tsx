import React, { useCallback, useState, useEffect, startTransition } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Comment, TweetType } from "@/utils/types";
import Post from "@/components/Post";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Line from "@/components/Line";
import API_BASE_URL from "@/utils/config";
import CustomImage from "@/components/CustomImage";
import useFetchUserId from "@/hooks/useFetchUserId";
import styles from "@/constants/styles/screens/TweetDetails.styles";

const TweetDetails: React.FC = () => {
  const { post_id, post } = useLocalSearchParams(); 
  const height = Dimensions.get("screen").height;

  const [tweet, setTweet] = useState<TweetType>({
    id: "",
    description: "",
    date_added: "",
    date_updated: "",
    picture_url: "",
    user_picture_url: "",
    reactions: 0,
    user_name: "",
    login: "",
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { userId, loading: userLoading } = useFetchUserId();

  useEffect(() => {
    if (typeof post === "string") {
      try {
        const parsedPost = JSON.parse(post);
        const tweetData: TweetType = {
          id: parsedPost.id,
          description: parsedPost.description,
          date_added: parsedPost.date_added,
          date_updated: parsedPost.date_updated,
          picture_url: parsedPost.picture_url,
          reactions: parsedPost.reactions,
          user_picture_url: parsedPost.user_picture_url,
          user_name: parsedPost.user_name,
          login: parsedPost.login,
        };

        startTransition(() => {
          setTweet(tweetData);
        });
      } catch (error) {
        console.error("Błąd parsowania JSON:", error);
      }
    } else {
      console.error("Oczekiwano ciągu znaków, ale otrzymano:", post);
    }
  }, [post]);

  const fetchComments = useCallback(async () => {
    if (!post_id) return;
    startTransition(() => {
      startTransition(() => {
        setLoadingComments(true);
      });
    });
    startTransition(() => {
      startTransition(() => {
        setError(null);
      });
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${post_id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "CustomAgent",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
      }
      const data = await response.json();
      startTransition(() => {
        setComments(data);
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      startTransition(() => {
        setError("Failed to load comments. Please try again.");
      });
    } finally {
      startTransition(() => {
        setLoadingComments(false);
      });
    }
  }, [post_id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !post_id) return;
    if (!userId) return;
    setIsSubmitting(true);

    try {
      const payload = new URLSearchParams({
        description: newComment.trim(),
        reactions: "0",
        user_id: userId, 
        post_id: Array.isArray(post_id) ? post_id.join(",") : post_id,
      });

      const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "CustomAgent",
        },
        body: payload.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Failed to add comment: ${response.status}`);
      }

      setNewComment("");
      Keyboard.dismiss();
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    < >
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
        style={{ paddingBottom: 30, backgroundColor: Colors.dark.background, paddingHorizontal: 20 }}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.commentContainer}>
              <View style={styles.imageContainer}>
                <View style={styles.userImageContainer}>
                  {item.avatar_url ? (
                    <CustomImage
                      url={item.avatar_url}
                      style={styles.userImage}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "@/assets/images/avatar_default.png",
                      }}
                      style={styles.userImage}
                    />
                  )}
                </View>
              </View>
              <View style={styles.commetnDetailsCOntainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item?.login || "Unknown"}</Text>
                  <Text style={{ color: Colors.light.text }}>•</Text>
                  <Text style={styles.username}>
                    @{item?.user_name || "unknown"}
                  </Text>
                </View>
                <View style={styles.commetnConteiner}>
                  <Text style={styles.commentContent}>{item.description}</Text>
                </View>
                <Line
                  width={100}
                  backgroundColor={Colors.light.background}
                  style={{ height: 1, marginTop: 15, opacity: 0.2 }}
                />
              </View>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <Post tweet={tweet} onDelete={fetchComments} />
        )}
        ListEmptyComponent={
          loadingComments ? (
            <ActivityIndicator size="large" color={Colors.light.text} />
          ) : (
            <Text style={{ color: Colors.light.text, textAlign: "center" }}>
              No comments available.
            </Text>
          )
        }
      />
      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          onSubmitEditing={handleAddComment}
        />
        <Pressable
          style={styles.floatingButton}
          onPress={handleAddComment}
          disabled={isSubmitting}
        >
          <Feather name="send" size={24} color={Colors.dark.background} />
        </Pressable>
      </View>
    </>
  );
};

export default TweetDetails;

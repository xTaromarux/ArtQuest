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
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Comment, TweetType, UserType } from "@/utils/types";
import Post from "@/components/Post";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Line from "@/components/Line";
import API_BASE_URL from "@/utils/config";

const TweetDetails: React.FC = () => {
  const { post_id, post } = useLocalSearchParams(); // Pobierz ID posta z parametrów URL
  const height = Dimensions.get("screen").height;

  const [tweet, setTweet] = useState<TweetType>({
    id: "",
    description: "",
    date_added: "",
    date_updated: "",
    picture_url: "",
    reactions: 0,
    user_name: "",
    login: "",
  });

  const [comments, setComments] = useState<Comment[]>([]); // Stan dla komentarzy
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<{ [key: string]: UserType }>({});
  const [newComment, setNewComment] = useState<string>(""); // Treść nowego komentarza
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

        setTweet(tweetData);
      } catch (error) {
        console.error("Błąd parsowania JSON:", error);
      }
    } else {
      console.error("Oczekiwano ciągu znaków, ale otrzymano:", post);
    }
  }, [post]);

  const fetchComments = useCallback(async () => {
    if (!post_id) return;
    setLoadingComments(true);
    setError(null);

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
      setComments(data);
      // Pobieranie danych użytkowników dla każdego komentarza
      data.forEach((comment: Comment) => fetchUserDetails(comment.user_id));
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoadingComments(false);
    }
  }, [post_id]);

  const fetchUserDetails = useCallback(
    async (user_id: string) => {
      if (users[user_id]) return; // Jeśli użytkownik już istnieje w stanie, pomiń
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/${user_id}/details`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }
        const userData: UserType = await response.json();
        setUsers((prev) => ({ ...prev, [user_id]: userData }));
      } catch (error) {
        console.error(`Error fetching user ${user_id}:`, error);
      }
    },
    [users]
  );

  const handleAddComment = async () => {
    if (!newComment.trim() || !post_id) return;
  
    setIsSubmitting(true);
  
    try {
      const payload = new URLSearchParams({
        description: newComment.trim(),
        reactions: "0",
        user_id: "e65cad91-1dfd-4469-abfc-3f3b65ca4efb", // Zamień na poprawne ID użytkownika
        post_id: Array.isArray(post_id) ? post_id.join(",") : post_id, // Upewnij się, że post_id jest ciągiem znaków
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
        renderItem={({ item }) => {
          const user = users[item.user_id]; 
          console.log(item.user_id);
          console.log(user);
          return (
            <View style={styles.commentContainer}>
              <View style={styles.imageContainer}>
                <View style={styles.userImageContainer}>
                  <Image
                    source={{
                      uri:
                        user?.picture_url ||
                        "@/assets/images/avatar_default.png",
                    }}
                    style={styles.userImage}
                  />
                </View>
              </View>
              <View style={styles.commetnDetailsCOntainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{user?.login || "Unknown"}</Text>
                  <Text style={{ color: Colors.light.text }}>•</Text>
                  <Text style={styles.username}>
                    @{user?.user_name || "unknown"}
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
    width: "80%",
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

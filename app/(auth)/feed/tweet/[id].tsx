import React, { useState, useEffect } from "react";
import { Link, useGlobalSearchParams, useRouter } from "expo-router";
import {
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import ExitLessonButton from "@/components/ExitLessonButton";
import SendTweetButton from "@/components/SendTweetButton";
import { useFetch, usePut } from "@/scripts/useFetch";

export default function TweetScreen() {
  const { id, post } = useGlobalSearchParams();
  const postString = Array.isArray(post) ? post[0] : post;
  const tweet = postString ? JSON.parse(postString) : null;

  const [text, setText] = useState(tweet ? tweet.Description : "");
  const router = useRouter();
  
  const user_id = tweet ? tweet.user.id : null;
  const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
  const web_url = "http://localhost:8000";
  const API_VALUE = Platform.OS === "web" ? web_url : base_url;
  
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(`/api/users/${user_id}`);
  
  const { putData, loading: putLoading, error: putError } = usePut(`/api/posts/${id}`);

  const onTweetPress = async () => {
    const formData = new FormData();
    formData.append('title', 'Updated Tweet');
    formData.append('description', text);
    formData.append('user_id', user_id);

    try {
      await putData(formData);
      console.warn("Updating the tweet: ", text);
      setText("");
      router.back();
    } catch (err) {
      console.error("Failed to update the tweet:", err);
    }
  };

  if (!tweet) {
    return (
      <View style={styles.page}>
        <Text>Tweet {id} not found!</Text>
      </View>
    );
  }

  if (userLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  if (userError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {userError}</Text>
      </SafeAreaView>
    );
  }

  const avatarUrl = API_VALUE + "/api/users/" + user_id + "/avatar";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.closeButtonContainer}>
            <Link href={{ pathname: "../" } as never} asChild>
              <ExitLessonButton
                iconName={"x"}
                onPress={undefined}
                onLongPress={undefined}
                disabled={undefined}
                activeOpacity={undefined}
              />
            </Link>
          </View>
          <View style={styles.middleContainer}></View>
          <View style={styles.acceptbarContainer}>
            <SendTweetButton
              iconName={"paper-plane"}
              onPress={onTweetPress}
              onLongPress={undefined}
              disabled={putLoading}
              activeOpacity={undefined}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Pressable style={styles.container}>
              <Image source={{ uri: avatarUrl }} style={styles.userImage} />
              <View style={styles.mainContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    paddingLeft: 5,
                  }}
                >
                  <Text style={styles.name}>{user?.name}</Text>
                  <Text style={styles.username}>· {user?.login}</Text>
                </View>
                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="What's happening?"
                  multiline
                  numberOfLines={5}
                  style={styles.content}
                />
              </View>
            </Pressable>
          </View>
        </View>
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
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1C9BF0",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
  },
  page: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  closeButtonContainer: {
    width: "20%",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    height: "100%",
  },
  acceptbarContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: "100%",
  },
  middleContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: "100%",
  },
  mainContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    flex: 8,
    borderRadius: 20,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  content: {
    width: "100%",
    lineHeight: 20,
    margin: 5,
  },
  name: {
    fontWeight: "600",
  },
  username: {
    color: "gray",
    marginLeft: 5,
  },
});

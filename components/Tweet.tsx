import React, { useState, useCallback } from "react";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import IconButton from "./IconButton";
import ConfirmationModal from "./ConfirmationModal";
import Menu, { MenuItem } from "./PopupMenu";
import { TweetType } from "@/utils/types";
import Colors from "@/constants/Colors";

type TweetProp = {
  tweet: TweetType;
  onDelete: () => void;
};

const user_id = "be72e28f-41af-4234-a112-0a0299ed7197"; // Replace with the actual user ID

const Tweet = ({ tweet, onDelete }: TweetProp) => {
  const [modalVisible, setModalVisible] = useState(false);
  const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
  const web_url = "http://localhost:8000";
  const API_VALUE = Platform.OS === "web" ? web_url : base_url;
  const avatarUrl = API_VALUE + "/api" + tweet.user.avatar_url;
  const imageUrl = API_VALUE + "/api" + tweet.image_url;

  const router = useRouter();

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  const handleEdit = () => {
    router.push({
      pathname: "/(auth)/feed/tweet/[id]",
      params: {
        id: tweet.id,
        post: JSON.stringify(tweet),
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userImageContainer}>
            <Image
              // source={{ uri: avatarUrl }}
              source={require("@/assets/images/avatar_default.png")}
              style={styles.userImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text>•</Text>
            <Text style={styles.username}>@{tweet.user.login}</Text>
          </View>
          <Menu
            style={styles.menu}
            key={tweet.id}
            trigger={
              <Entypo name="dots-three-horizontal" size={20} color="gray" />
            }
          >
            <MenuItem
              key={1}
              text={tweet.user.id == user_id ? "Edit" : ""}
              onPress={tweet.user.id == user_id ? handleEdit : () => {}}
            />
            <MenuItem key={2} text="Delete" onPress={handleDelete} />
          </Menu>
        </View>

        {/* Main Content */}
        {tweet.image_url && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        )}

        {/* Description */}

        <View style={styles.footer}>
          <Text style={styles.content}>{tweet.Description}</Text>
          <IconButton
            icon="heart"
            solid={false}
            color="white"
            text={tweet.numberOfLikes || 0}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={() => {}}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this post?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 10,
    margin: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  header: {
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userInfo: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    flexDirection: "row",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10,
  },
  username: {
    color: "gray",
    marginLeft: 10,
  },
  menu: {
    marginLeft: "auto",
  },
  content: {
    width: "100%",
    color: Colors.light.text,
    height: "100%",
    fontSize: 14,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default Tweet;
